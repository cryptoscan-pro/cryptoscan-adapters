import { readdirSync } from 'fs';
import { createBunWebSocket } from "hono/bun";
import { Hono } from 'hono';

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

async function loadProject(p: string) {
  const info = await import(p);

  const { default: { type, provider: { ip, handler } } } = info;

  return (data: Record<string, string | number>, senderIp: string) => {
    if (senderIp === ip && type === data.type) {
      return handler(data);
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
        console.log(ws)
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
