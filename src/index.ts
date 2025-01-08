import { readdirSync } from 'fs';
import processData from "cryptoscan-provider";
import { serve } from "bun";
import { setupCluster } from "./cluster";
import { incrementCounter } from "./utils/metrics";
import { log } from 'console';

function formatError(error: Error, context: any = {}) {
  return {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    context
  };
}

async function loadProject(p: string) {
  const info = await import(p);

  const { default: { type, provider: { ip, handler } } } = info;

  return async (data: Record<string, string | number>, senderIp: string) => {
    if ((process.env.NODE_ENV === "development" || senderIp === ip) && type.toLowerCase() === data.type.toLowerCase()) {
      if (!data.key) {
        data.key = data.id;
      }
      if (!data?.key) {
        return "key is required";
      }

      const d = await handler(data);

      if (!d) {
        return "Invalid data";
      }

      processData(d, true);
    }
  }
}

async function loadProjects() {
  const files = readdirSync('./src/projects/');

  return Promise.all(files.map((f) => loadProject('./projects/' + f + "/index.ts")))
}

const triggerProjects = await loadProjects();

const ports = process.env.PORTS?.split(",").map(Number) || [3000];
const isWorker = setupCluster(ports);

if (isWorker) {
  const port = Number(process.env.WORKER_PORT);

  serve({
    port,
    fetch(req, server) {
      const url = new URL(req.url, `http://${req.headers.get("host")}`);
      const keys = url.searchParams.get("keys");
      const types = url.searchParams.get("types");
      const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || server.requestIP(req)?.address;

      if (server.upgrade(req, {
        data: { keys, types, clientIp }
      })) {
        return;
      }
      return new Response("Not a WebSocket request", { status: 400 });
    },
    websocket: {
      open() {
        console.log('WebSocket connection opened.');
      },
      close() {
        console.log('WebSocket connection closed.');
      },
      async message(ws, message) {
        try {
          incrementCounter(Number(process.env.WORKER_PORT));
          let data = {};
          const messageStr = message.toString();
          
          logger.info(`Incoming message on port ${process.env.WORKER_PORT}:`, {
            message: messageStr,
            timestamp: new Date().toISOString()
          });

          try {
            const keys = (ws.data as any).keys?.split(',');
            const types = (ws.data as any).types?.split(',');

            if (keys?.length && types?.length) {
              const values = messageStr.split(',').map((v, idx) => {
                const type = types[idx];
                if (type === 'boolean' || v === 'true' || v === 'false') {
                  return Number(v === 'true');
                }
                if (type === 'number') {
                  return Number(v);
                }
                return v;
              }) as any;
              data = Object.fromEntries(keys.map((key: string, idx: number) => [key, values[idx]]));
              logger.info('Successfully parsed structured data:', {
                port: process.env.WORKER_PORT,
                parsedData: data,
                messageType: 'structured'
              });
            }
            else {
              data = JSON.parse(messageStr);
              logger.info('Successfully parsed JSON data:', {
                port: process.env.WORKER_PORT,
                parsedData: data,
                messageType: 'json'
              });
            }

            for (const trigger of triggerProjects) {
              try {
                const response = await trigger(data, (ws.data as any).clientIp);
                if (response) {
                  logger.info('[Trigger Response]', { response });
                  ws.send(response);
                }
              } catch (e) {
                logger.error('[Trigger Error]', formatError(e, {
                  data,
                  message: messageStr,
                  clientIp: (ws.data as any).clientIp
                }));
                ws.send(e.message);
              }
            }
          } catch (parseErr) {
            logger.error('Failed to parse message:', {
              port: process.env.WORKER_PORT,
              error: parseErr.message,
              rawMessage: messageStr,
              timestamp: new Date().toISOString()
            });
            ws.send(JSON.stringify({ 
              error: 'Parse error', 
              message: parseErr.message,
              originalMessage: messageStr
            }));
          }
        } catch (globalErr) {
          logger.error('Global message handling error:', {
            port: process.env.WORKER_PORT,
            error: globalErr.message,
            stack: globalErr.stack,
            rawMessage: message?.toString(),
            timestamp: new Date().toISOString()
          });
        }
      },
    }
  })
}
