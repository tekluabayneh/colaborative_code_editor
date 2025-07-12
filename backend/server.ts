import ConnectDB from "./config/db"
// import app from "./app";
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//     await ConnectDB()
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
import app from "./app";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await ConnectDB(); // ⬅️ Wait for MongoDB connection first
        console.log("✅ MongoDB connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1); // Exit the app if DB fails
    }
};

startServer();


