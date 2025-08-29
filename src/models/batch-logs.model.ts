import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import batchConstants from "../constants/batch.constants";

interface IBatchLog extends Document {
  batchConfigId: Types.ObjectId;

  startTime: number;
  endTime?: number;
  duration?: number;

  status: string;
  previousStatus?: string;

  detectionType: string;
  initiatedBy: Types.ObjectId;
  eventComponentId?: Types.ObjectId;
}

const BATCH_STATUS_ALLOWED = [
  ...Object.values(batchConstants.BATCH_STATUS_ENUM),
];

const BATCH_DETECTION_ALLOWED = [
  ...Object.values(batchConstants.BATCH_DETECTION_ENUM),
];

const batchLogSchema = new Schema<IBatchLog>(
  {
    batchConfigId: {
      type: Schema.Types.ObjectId,
      ref: "batch-components",
      required: true,
    },

    startTime: {
      type: Number,
      required: true,
    },

    endTime: {
      type: Number,
    },

    duration: {
      type: Number,
    },

    status: {
      type: String,
      enum: BATCH_STATUS_ALLOWED,
      required: false,
    },

    previousStatus: {
      type: String,
      enum: BATCH_STATUS_ALLOWED,
    },

    detectionType: {
      type: String,
      enum: BATCH_DETECTION_ALLOWED,
      required: false,
    },

    initiatedBy: {
      type: Schema.Types.ObjectId,
      ref: "triggers",
      required: false,
    },

    eventComponentId: {
      type: Schema.Types.ObjectId,
      ref: "event-components",
    },
  },
  {
    timestamps: true,
  }
);

batchLogSchema.index({ batchConfigId: 1, startTime: -1 });
batchLogSchema.index({ startTime: -1 });

const BatchLogModel: Model<IBatchLog> = mongoose.model<IBatchLog>(
  "batch-logs",
  batchLogSchema,
  "batch-logs"
);

export { BatchLogModel, IBatchLog };
