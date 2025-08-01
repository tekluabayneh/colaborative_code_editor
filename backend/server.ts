import mongoConnect from "./config/db"
import app from "./app";
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // await mongoConnect();
        console.log("✅ MongoDB connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();



