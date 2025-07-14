import mongoose from "mongoose";


const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI!)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default mongoConnect;


// db-password=RqkMJnpAg3bROSRQ
//mongodb-url=mongodb+srv://tekluabayneh:RqkMJnpAg3bROSRQ@cluster0.h8u2gll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

