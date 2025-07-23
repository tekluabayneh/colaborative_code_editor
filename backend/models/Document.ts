// models/Content.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true }, // Same ID as the file node
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Add this line
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);

