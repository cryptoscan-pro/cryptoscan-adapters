import { test } from "vitest";
import { WebSocket } from "ws"

test('should load test', async () => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.on('open', () => {
        console.log('open')
        for (let i = 0; i < 1; i++) {
            console.log(JSON.stringify({"type": "news", "content": "\{\"text\":\"test data\",\"tags\":\"news\"\}"}))
            ws.send(JSON.stringify({"type": "news", "content": "\{\"text\":\"test data\",\"tags\":\"news\"\}"}))
        }
    })

    ws.on('close', () => {
        console.log('close')
    })
    await new Promise((r) => setTimeout(r, 1000))
})

