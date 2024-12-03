import { readdirSync } from 'fs';
import { createBunWebSocket } from "hono/bun";
import { Hono } from 'hono';
import { createProcessData } from "cryptoscan-provider";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();
const processDataHandlers = new Map<string, (data: Record<string, any>) => string>();

async function loadProject(p: string) {
  const info = await import(p);

  const { default: { type, provider: { ip, handler } } } = info;

  return (data: Record<string, string | number>, senderIp: string) => {
    if ((process.env.NODE_ENV !== "development" && senderIp === ip) && type === data.type) {
      const processData = processDataHandlers.get(type);

      if (!processData) {
        const processData = createProcessData()
        processDataHandlers.set(type, processData);
        return processData(handler(data));
      }

      return processData(handler(data));
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
        console.log("Received:", event.data.toString(), ws.remoteAddress)

        for (const trigger of triggerProjects) {
          trigger(event.data.toString(), ws.remoteAddress);
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
