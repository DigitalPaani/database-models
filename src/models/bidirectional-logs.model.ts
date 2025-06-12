import mongoose, { Schema, Document, Types } from "mongoose";

interface IBidirectionalEvents {
  sensorId: Types.ObjectId;
  controlValue: string;
}
interface IBidirectionalLogs extends Document {
  userId: Types.ObjectId;
  bidirectionalId: Types.ObjectId;
  controlValue: string;
  startTime: number;
  endTime?: number;
  ipAddress: string;
  events: IBidirectionalEvents[];
  success: boolean;
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
    success: {
      type: Boolean,
      default: false,
      required: true,
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
