import mongoConnect from "./config/db";
import app from "./app";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoConnect();
        console.log("✅ MongoDB connected");

        // Create raw HTTP server from Express app
        const server = http.createServer(app);

        // Setup Socket.io
        const io = new SocketIOServer(server, {
            cors: {
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        // Handle connections
        io.on("connection", (socket) => {
            console.log("✅ User connected:", socket.id);

            // Listen for chat messages
            socket.on("chat_message", (msg) => {
                // Broadcast to all users
                io.emit("chat_message", msg);
            });

            socket.on("disconnect", () => {
                console.log("❌ User disconnected:", socket.id);
            });
        });

        // Start the server
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on port :${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
