import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IOverallSystemChangesLog extends Document {
  feature: string;
  type: string;
  oldConfiguration: any;
  newConfiguration: any;
}

const overallSystemLogSchema = new Schema<IOverallSystemChangesLog>(
  {
    feature: {
      type: String,
      enum: ["TRIGGER"],
    },
    type: {
      type: String,
      enum: ["ACTIVE_INACTIVE_TRIGGER", "EDIT_COMMUNICATION_COMPONENT"],
    },
    oldConfiguration: {
      type: Schema.Types.Mixed,
      required: false,
    },
    newConfiguration: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const OverallSystemChangesLogModel: Model<IOverallSystemChangesLog> =
  mongoose.model<IOverallSystemChangesLog>(
    "overallSystemChangesLogs",
    overallSystemLogSchema,
    "overallSystemChangesLogs"
);


export {
    OverallSystemChangesLogModel,
    IOverallSystemChangesLog
};