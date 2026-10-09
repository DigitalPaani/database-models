import mongoose, { Schema, Document } from "mongoose";

const WATCHDOG_EVENT_TYPES = [
  "BREAK_START",
  "CAUSE_CHANGE",
  "ACTION",
  "RECOVERY",
  "DEVICE_DOWN",
  "DEVICE_UP",
  "DATALOGGER_STARTUP",
] as const;

const WATCHDOG_CAUSE_CODES = [
  "CABLE_UNPLUGGED",
  "WIFI_DISCONNECTED",
  "WIFI_WEAK_SIGNAL",
  "ROUTER_UNREACHABLE",
  "WAN_DOWN",
  "PLC_DOWN",
  "HMI_DOWN",
  "FIRST_START",
  "SCRIPT_RESTART",
  "SYSTEM_BOOT_CLEAN",
  "SYSTEM_BOOT_UNCLEAN",
] as const;

const WATCHDOG_ACTIONS_TAKEN = [
  "NONE",
  "NET_RESET",
  "ROUTER_REBOOT",
  "DATALOGGER_REBOOT",
] as const;

type WatchdogEventType = (typeof WATCHDOG_EVENT_TYPES)[number];
type WatchdogCauseCode = (typeof WATCHDOG_CAUSE_CODES)[number];
type WatchdogActionTaken = (typeof WATCHDOG_ACTIONS_TAKEN)[number];

interface IWatchdogEvent extends Document {
  eventId: string;
  incidentId: string;
  plantId: string;
  plcId: string;
  deviceId: string;
  event: WatchdogEventType;
  causeCode: WatchdogCauseCode | null;
  actionTaken: WatchdogActionTaken;
  downtimeSeconds: number | null;
  detail: unknown;
  TIMESTAMP: string;
  receivedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const watchdogEventSchema = new Schema<IWatchdogEvent>(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    incidentId: {
      type: String,
      required: true,
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
    deviceId: {
      type: String,
      required: true,
      index: true,
    },
    event: {
      type: String,
      required: true,
      enum: WATCHDOG_EVENT_TYPES,
    },
    causeCode: {
      type: String,
      enum: [...WATCHDOG_CAUSE_CODES, null],
      default: null,
    },
    actionTaken: {
      type: String,
      required: true,
      enum: WATCHDOG_ACTIONS_TAKEN,
      default: "NONE",
    },
    downtimeSeconds: {
      type: Number,
      default: null,
    },
    detail: {
      type: Schema.Types.Mixed,
    },
    TIMESTAMP: {
      type: String,
      required: true,
    },
    receivedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const WatchdogEventModel = mongoose.model<IWatchdogEvent>(
  "watchdogEvents",
  watchdogEventSchema,
  "watchdogEvents"
);

export {
  WatchdogEventModel,
  IWatchdogEvent,
  WATCHDOG_EVENT_TYPES,
  WATCHDOG_CAUSE_CODES,
  WATCHDOG_ACTIONS_TAKEN,
  WatchdogEventType,
  WatchdogCauseCode,
  WatchdogActionTaken,
};
