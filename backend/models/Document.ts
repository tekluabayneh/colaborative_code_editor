import mongoose, { Schema, Document, Types } from "mongoose";

interface IDocument extends Document {
  content: string;
  language?: string;
  ownerType: "User" | "Owner";            
  ownerId: Types.ObjectId;                
}

const DocumentSchema: Schema<IDocument> = new Schema({
  content: { type: String },
  language: { type: String, required:true, default: "plaintext" },
  ownerType: { type: String, required: true, enum: ["User", "Owner"] },
  ownerId: { type: Schema.Types.ObjectId, required: true, refPath: "ownerType" },
});

const Documents = mongoose.model("Document", DocumentSchema);
export default Documents;

