import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IOverallSystemChangesLog extends Document {
  feature: string;
  subFeature: string;
  oldConfiguration: any;
  newConfiguration: any;
}

const overallSystemLogSchema = new Schema<IOverallSystemChangesLog>(
  {
    feature: {
      type: String,
      enum: ["TRIGGER"],
    },
    subFeature: {
      type: String,
      enum: ["UPDATE_TRIGGER"],
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