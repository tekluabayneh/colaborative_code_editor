import mongoose from "mongoose";


const mongoConnect = async () => {
    try {
        mongoose.connect(process.env.MongoDB_URI!)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default mongoConnect;


