import mongoose, { Model } from "mongoose";

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
  ProjectId: {
    type: String,
    required: true,
  },
  InvitedBy: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Number,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

const InviteTokenSchema = mongoose.model("InviteToken", InviteSchema);

export default InviteTokenSchema;
