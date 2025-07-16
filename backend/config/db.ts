// import mongoose from "mongoose";
//
//
// const mongoConnect = async () => {
//     try {
//         await mongoose.connect(process.env.MongoDB_URI!)
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// }
//
// export default mongoConnect;
//
//
//  
// config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MongoDB_URI);
const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI!, {
            dbName: "mydb", // Optional if it's already in your URI
        });
        console.log("✅ Connected to MongoDB with Mongoose");
    } catch (error) {
        console.error("❌ Mongoose connection error:", error);
        process.exit(1);
    }
};

export default mongoConnect;


