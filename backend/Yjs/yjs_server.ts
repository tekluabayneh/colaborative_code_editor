import http from "http";
import WebSocket from "ws";
const { setupWSConnection } = require("y-websocket/bin/utils.js");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (conn, req) => {
  const docName = req.url?.slice(1).split("?")[0] || "default";
  setupWSConnection(conn, req);
});

server.listen(1234, () =>
  console.log("✅ Yjs WebSocket server running at ws://localhost:1234")
);
