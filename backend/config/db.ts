// import mongoose from "mongoose";
//
// console.log(process.env.MONGODB_URL);
// const mongoConnect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL!)
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// }
//
// export default mongoConnect;
//

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoConnect = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    console.log("MONGODB_URL:", MONGODB_URL);
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
        throw error; // Let server.ts handle the error
    }
};

export default mongoConnect;
