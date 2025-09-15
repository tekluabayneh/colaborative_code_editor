import mongoose, { Schema } from "mongoose";
const userSchema: Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
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
    enum: ["Editor", "Admin", "Reviewer", "Read_only", "suspended", "deleted"],
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

const Users = mongoose.model("User", userSchema);

export default Users;
