import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IGeneralCommunication extends Document {
  userId: Types.ObjectId;
  message: string;
  communicationType: string;
}

const generalCommunicationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    communicationType: {
      type: String,
      enum: ["WHATSAPP", "SMS", "CALL", "EMAIL", "REPORT"],
      required: true,
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
