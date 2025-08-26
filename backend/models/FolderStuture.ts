import mongoose, { Schema, Document, Types } from "mongoose";

// Node interface
interface INode extends Document {
  name: string;
  folderId: string;                    
  contentId: Types.ObjectId;            
  ownerType: "User" | "Owner" | "Admin";           
  ownerId: Types.ObjectId;                
  nodes?: INode[];                        // recursive child nodes
}

// Node schema (recursive)
const NodeSchema: Schema<INode> = new Schema({
  name: { type: String, required: true },
  folderId: { type: String , required:true},
  contentId: { type: Schema.Types.ObjectId, required:true,ref: "Document" }, // only for files
  ownerType: { type: String, required: true, enum: ["User", "Owner"] },
  ownerId: { type: Schema.Types.ObjectId, required: true, refPath: "ownerType" },
  nodes: [this],
});

// FolderTree schema
const FolderTreeSchema = new Schema({
  root: [NodeSchema],
});

const FolderTree = mongoose.model("FolderTree", FolderTreeSchema);
export default FolderTree;
