// models/Content.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema= new Schema({
	_id: {
		type: Schema.Types.ObjectId, // this should be same id as the folder/file id
		required: true 
	}, 
	content: { 
		type: String, 
		required: true },
	owner: {
		type: Schema.Types.ObjectId, 
		ref: "User", 
		required: true } 
}, { timestamps: true });

export const Document = mongoose.model("Documents", DocumentSchema);
