import { readdirSync } from 'fs';
import { createBunWebSocket } from "hono/bun";
import { Hono } from 'hono';
import processData from "cryptoscan-provider";
import { serve } from "bun";

const { upgradeWebSocket, websocket } = createBunWebSocket();

const app = new Hono();

async function loadProject(p: string) {
  const info = await import(p);

  const { default: { type, provider: { ip, handler } } } = info;

  return async (data: Record<string, string | number>, senderIp: string) => {
    if ((process.env.NODE_ENV === "development" || senderIp === ip) && type === data.type) {
      if (!data?.key) {
        return "key is required";
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

let idx = 0;
serve({
  port: 3000,
  fetch(req, server) {
    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const keys = url.searchParams.get("keys");
    const types = url.searchParams.get("types");
    if (server.upgrade(req, {
      data: { keys, types }
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
      let data = {};

      try {
        idx += 1;
        const keys = (ws.data as any).keys?.split(',');
        const types = (ws.data as any).types?.split(',');

        if (keys?.length && types?.length) {
          const values = message.toString().split(',').map((v, idx) => {
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
        }
        else {
          data = JSON.parse(message.toString())
        }

        for (const trigger of triggerProjects) {
          try {
            const response = await trigger(data, ws.remoteAddress);
            if (response) {
              ws.send(response);
            }
          } catch (e) {
            console.error(e, message);
            ws.send(e.message);
          }
        }
      } catch (err) {
        console.log({ error: 'Wrong data', reason: err.message })
      }
    },
  }
})
