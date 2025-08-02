import mongoose from "mongoose";
import type { Owners } from "../types/Owners";

const OwnersSchema = new mongoose.Schema<Owners>({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["Owner"],
        default: "Owner",
    }
})
const Owners = mongoose.model<Owners>("Owners", OwnersSchema);

export default Owners;
