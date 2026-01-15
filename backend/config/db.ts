import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoConnect = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    // const MONGODB_URL = "mongodb://localhost:27017/colab_db";
    if (!MONGODB_URL) {
        throw new Error("MONGODB_URL environment variable is not set");
    }

    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(MONGODB_URL, {
            retryWrites: true,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export default mongoConnect;


