import mongoose, { Schema, Document } from "mongoose";
import {
  WATCHDOG_EVENT_TYPES,
  WatchdogEventType,
} from "./watchdog-event.model";

const DEVICE_STATUSES = ["ONLINE", "OFFLINE"] as const;

type DeviceStatus = (typeof DEVICE_STATUSES)[number];

interface IDeviceStatus extends Document {
  deviceId: string;
  plantId: string;
  plcId: string;
  status: DeviceStatus;
  lastEvent: WatchdogEventType;
  lastEventAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const deviceStatusSchema = new Schema<IDeviceStatus>(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    plantId: {
      type: String,
      required: true,
      index: true,
    },
    plcId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: DEVICE_STATUSES,
    },
    lastEvent: {
      type: String,
      required: true,
      enum: WATCHDOG_EVENT_TYPES,
    },
    lastEventAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

deviceStatusSchema.index({ plantId: 1, status: 1 });

const DeviceStatusModel = mongoose.model<IDeviceStatus>(
  "watchdogDeviceStatuses",
  deviceStatusSchema,
  "watchdogDeviceStatuses"
);

export {
  DeviceStatusModel,
  IDeviceStatus,
  DEVICE_STATUSES,
  DeviceStatus,
};
