import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IUserVerification extends Document {
  userId: Types.ObjectId;
  verificationType: 'EMAIL_ADDRESS' | "PHONE_NUMBER";
  encryptedOtp: string;
  isVerified: boolean;
  expiresAt: Date | null;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
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
      enum: ['EMAIL_ADDRESS', "PHONE_NUMBER"],
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
    expiresAt: {
      type: Date,
      required: false,
      default: null,
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
export { IUserVerification, UserVerificationModel };