import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IGeneralCommunication extends Document {
  userId: Types.ObjectId;
  messageContent: string;
  senderType: string;
  channel: string;
  status: string;
  isArchived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const generalCommunicationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
    senderType: {
      type: String,
      enum: ["USER", "DOCTOR_PAANI"],
    },
    channel: {
      type: String,
      enum: ["WHATSAPP", "SMS", "CALL", "EMAIL", "REPORT"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"]
    },
    isArchived: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const GeneralCommunicationModel: Model<IGeneralCommunication> =
  mongoose.model<IGeneralCommunication>(
    "generalCommunication",
    generalCommunicationSchema,
    "generalCommunication"
  );

export { GeneralCommunicationModel, IGeneralCommunication };
