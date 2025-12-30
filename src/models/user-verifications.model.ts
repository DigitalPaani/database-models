import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

enum VerificationTypeEnum {
  EMAIL_ADDRESS = 'EMAIL_ADDRESS',
  PHONE_NUMBER = 'PHONE_NUMBER',
}

interface IUserVerification extends Document {
  userId: Types.ObjectId;
  verificationType: VerificationTypeEnum;
  encryptedOtp: string;
  isVerified: boolean;
  expiresAt: Date;
  verifiedAt: Date | null;
  phoneNumber: Number;
  createdAt: Date;
  updatedAt: Date;
}

type Window = {
  width: number;
  height: number;
}

interface Window2 {
  innerWidth: number;
  innerHeight: number;
}

interface Window2 {
  innerWidth: number;
  innerHeight: number;
}

const userVerificationSchema = new Schema<IUserVerification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    verificationType: {
      type: String,
      enum: Object.values(VerificationTypeEnum),
      required: true,
    },
    encryptedOtp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phoneNumber: {
      type: Number,
      required: false
    },
    expiresAt: {
      type: Date,
      required: true
    },
    verifiedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserVerificationModel: Model<IUserVerification> = mongoose.model<IUserVerification>("UserVerifications", userVerificationSchema);
export { IUserVerification, UserVerificationModel, VerificationTypeEnum };