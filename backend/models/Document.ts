import mongoose, { Schema, Document, Types } from "mongoose";

interface IDocument extends Document {
  content: string;
  language?: string;
  ownerType: "User" | "Owner";            
  ownerId: Types.ObjectId;                // who owns this content
}

const DocumentSchema: Schema<IDocument> = new Schema({
  content: { type: String, required: true },
  language: { type: String, required:true, default: "plaintext" },
  ownerType: { type: String, required: true, enum: ["User", "Owner"] },
  ownerId: { type: Schema.Types.ObjectId, required: true, refPath: "ownerType" },
});

const Document = mongoose.model("Document", DocumentSchema);
export default Document;

