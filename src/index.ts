import { readdirSync } from 'fs';
import { createBunWebSocket } from "hono/bun";
import { Hono } from 'hono';
import { createProcessData } from "cryptoscan-provider";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();
const processDataHandlers = new Map<string, (data: ({ key: string } & Record<string, string | number>)) => string>();

async function loadProject(p: string) {
  const info = await import(p);

  const { default: { type, provider: { ip, handler } } } = info;

  return async (data: Record<string, string | number>, senderIp: string) => {
    if ((process.env.NODE_ENV === "development" || senderIp === ip) && type === data.type) {
      if (!data?.key) {
        return "key is required";
      }

      const processData = processDataHandlers.get(type);

      if (!processData) {
        const processData = createProcessData()
        processDataHandlers.set(type, processData as any);
        console.log(await handler(data))
        processData(await handler(data));
        return;
      }

      processData(await handler(data));
    }
  }
}

async function loadProjects() {
  const files = readdirSync('./src/projects/');

  return Promise.all(files.map((f) => loadProject('./projects/' + f + "/index.ts")))
}

const triggerProjects = await loadProjects();

app.get('/',
  (upgradeWebSocket as any)(() => {
    return {
      onMessage: async (event: any, ws: any) => {
        for (const trigger of triggerProjects) {
          try {
            const response = await trigger(JSON.parse(event.data.toString()), ws.remoteAddress);
            if (response) {
              ws.send(response);
            }
          } catch (e) {
            console.error(e, event);
            ws.send(e.message);
          }
        }
      },
    }
  }
  )
)

export default {
  fetch: app.fetch,
  websocket,
};
