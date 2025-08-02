import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    usrName: {
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
        enum: ["Editor", "Admin", "Reviewer", "Read_only"],
    },
    OnwenersId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Onwser",
        required: true
    }

})

const Users = mongoose.model("User", userSchema);

export default Users;
