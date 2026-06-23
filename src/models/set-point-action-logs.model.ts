import mongoose, { Schema, Document, Types } from "mongoose";
import commonConstants from "../constants/commonConstants";

const DEVICE_STATUS = {
  matched: "matched",
  mismatched: "mismatched",
  unknown: "unknown",
} as const;

type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];

interface ISetPointActionLog extends Document {
  setPointId: Types.ObjectId;
  sensorIds?: Types.ObjectId[];
  userId?: Types.ObjectId;

  // What was published
  controlTopic: string;
  sensorTag: string[];
  requestedAction: 0 | 1;
  payload?: unknown;

  // Publish leg (was MQTT sent?)
  published: boolean;
  publishedAt?: number;

  // Acknowledgement leg (was a message received back?)
  statusTopic?: string;
  acknowledged: boolean;
  acknowledgedAt?: number;
  rawMessage?: unknown;
  deviceValue?: number;
  deviceStatus: DeviceStatus;

  // Overall outcome
  status: string;
  success: boolean;
  message?: string;
  errorDetails?: unknown;

  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const setPointActionLogSchema = new Schema<ISetPointActionLog>(
  {
    setPointId: {
      type: Schema.Types.ObjectId,
      ref: "SetPoint",
      required: true,
    },
    sensorIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "sensors",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
    },

    controlTopic: {
      type: String,
      required: true,
    },
    sensorTag: [
      {
        type: String,
        required: true,
      },
    ],
    requestedAction: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
    },

    published: {
      type: Boolean,
      default: false,
      required: true,
    },
    publishedAt: {
      type: Number,
    },

    statusTopic: {
      type: String,
    },
    acknowledged: {
      type: Boolean,
      default: false,
      required: true,
    },
    acknowledgedAt: {
      type: Number,
    },
    rawMessage: {
      type: Schema.Types.Mixed,
    },
    deviceValue: {
      type: Number,
    },
    deviceStatus: {
      type: String,
      enum: Object.values(DEVICE_STATUS),
      default: DEVICE_STATUS.unknown,
    },

    status: {
      type: String,
      enum: Object.values(commonConstants.REMOTE_CONTROL_STATUS),
      default: commonConstants.REMOTE_CONTROL_STATUS.initiated,
    },
    success: {
      type: Boolean,
      default: false,
      required: true,
    },
    message: {
      type: String,
    },
    errorDetails: {
      type: Schema.Types.Mixed,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const SetPointActionLogModel = mongoose.model<ISetPointActionLog>(
  "setPointActionLogs",
  setPointActionLogSchema,
  "setPointActionLogs"
);

export {
  SetPointActionLogModel,
  ISetPointActionLog,
  DEVICE_STATUS,
  DeviceStatus,
};
