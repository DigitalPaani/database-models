import mongoose, { Schema, Document, Types } from "mongoose";
import commonConstants from "../constants/commonConstants";

interface IBidirectionalEvents {
  sensorId: Types.ObjectId;
  controlValue: string;
}
interface IBidirectionalLogs extends Document {
  userId: Types.ObjectId;
  bidirectionalId: Types.ObjectId;
  controlValue: string;
  softwareBypassValue?: string;
  startTime: number;
  endTime?: number;
  ipAddress: string;
  events: IBidirectionalEvents[];
  success: boolean;
  status: string;
  relativeTimeDetails?: {
    unit: string;
    value: number;
  };
  scheduledBidirectionalLogId?: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const bidirectionalLogsSchema = new Schema<IBidirectionalLogs>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    bidirectionalId: {
      type: Schema.Types.ObjectId,
      ref: "bidirectional",
      required: true,
    },
    controlValue: {
      type: String,
      required: true,
    },
    softwareBypassValue: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    events: [
      {
        sensorId: {
          type: Schema.Types.ObjectId,
          ref: "sensors",
        },
        controlValue: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(commonConstants.REMOTE_CONTROL_STATUS),
      default: commonConstants.REMOTE_CONTROL_STATUS.unknown,
    },
    success: {
      type: Boolean,
      default: false,
      required: true,
    },
    relativeTimeDetails: {
      unit: String,
      value: Number,
    },
    scheduledBidirectionalLogId: {
      type: Schema.Types.ObjectId,
      ref: "bidirectionalLogs",
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const BidirectionalLogsModel = mongoose.model<IBidirectionalLogs>(
  "bidirectionalLogs",
  bidirectionalLogsSchema,
  "bidirectionalLogs"
);

export { BidirectionalLogsModel, IBidirectionalLogs };
