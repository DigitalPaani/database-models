import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IUserVerification extends Document {
  userId: Types.ObjectId;
  verificationType: 'EMAIL' | "PHONE_NUMBER";
  isVerified: boolean;
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
      enum: ['EMAIL', "PHONE_NUMBER"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
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

const UserVerification: Model<IUserVerification> = mongoose.model<IUserVerification>("UserVerifications", userVerificationSchema);
export { IUserVerification, UserVerification };