import mongoose, { Schema, Document, Types } from "mongoose";

export interface INode extends Document {
  name: string;
  folderId: string; 
  contentId?: Types.ObjectId | null;
  ownerType: "User" | "Owner" | "Admin";
  ownerId: Types.ObjectId;
  parentId?: Types.ObjectId | null; 
}

const FolderTreeSchema = new Schema<INode>({
  name: { type: String, required: true },
  folderId: { type: String, required: true, unique: true },

  // File reference (optional)
  contentId: { type: Schema.Types.ObjectId, ref: "Document", default: null },

  // Owner
  ownerType: { type: String, required: true, enum: ["User", "Owner", "Admin"] },
  ownerId: { type: Schema.Types.ObjectId, required: true, refPath: "ownerType" },

  // Parent reference (optional)
  parentId: { type: Schema.Types.ObjectId, ref: "FolderTree", default: null }
}, { timestamps: true });

const FolderTree = mongoose.model<INode>("FolderTree", FolderTreeSchema);

export default FolderTree;

