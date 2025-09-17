// yjs-server.ts
import { WebsocketServer } from "y-websocket";

const port: number = Number(process.env.PORT) || 1234;

// Create Yjs WebSocket server
const wss = new WebsocketServer({ port });

wss.on("connection", (conn) => {
  console.log("New client connected");
});

// Optional: log when server starts
console.log(`Yjs WebSocket Server running on ws://localhost:${port}`);
