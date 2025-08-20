import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  InvitedBy: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date, 
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

InviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const InviteToken = mongoose.model("InviteToken", InviteSchema);

export default InviteToken;
