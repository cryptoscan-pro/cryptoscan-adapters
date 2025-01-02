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
          
          console.log(`[${new Date().toISOString()}] Received message:`, messageStr);

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
              console.log('[Data Parsing] Parsed structured data:', data);
            }
            else {
              data = JSON.parse(messageStr);
              console.log('[Data Parsing] Parsed JSON data:', data);
            }

            for (const trigger of triggerProjects) {
              try {
                const response = await trigger(data, (ws.data as any).clientIp);
                if (response) {
                  console.log('[Trigger Response]', response);
                  ws.send(response);
                }
              } catch (e) {
                console.error('[Trigger Error]', formatError(e, {
                  data,
                  message: messageStr,
                  clientIp: (ws.data as any).clientIp
                }));
                ws.send(e.message);
              }
            }
          } catch (parseErr) {
            console.error('[Parse Error]', formatError(parseErr, {
              rawMessage: messageStr,
              wsData: ws.data
            }));
            console.log({ error: 'Wrong data', reason: parseErr.message });
          }
        } catch (globalErr) {
          console.error('[Global Handler Error]', formatError(globalErr, {
            rawMessage: message?.toString(),
            wsData: ws.data
          }));
        }
      },
    }
  })
}
