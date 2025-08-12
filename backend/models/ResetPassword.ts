
import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {  // small style: 'IToken' instead of 'ITOKEN'
  email: string;
  token: string;
  expiresAt?: Date;
}

const ResetLinkTokenSchema: Schema<IToken> = new Schema<IToken>({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },  
});

// TTL index — automatically deletes document when expiresAt is reached
ResetLinkTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetLinkModel = mongoose.model<IToken>("ResetLinkModel", ResetLinkTokenSchema);

export default ResetLinkModel;

