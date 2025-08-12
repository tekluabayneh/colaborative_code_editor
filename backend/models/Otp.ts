import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: string;
  expiresAt?: Date;
}

const otpSchema: Schema = new Schema<IOtp>({

  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true},  

});

//  Automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model<IOtp>('Otp', otpSchema);

export default OtpModel;

