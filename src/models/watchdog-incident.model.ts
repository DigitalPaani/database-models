import mongoose, { Schema, Document } from "mongoose";
import {
  WATCHDOG_CAUSE_CODES,
  WATCHDOG_ACTIONS_TAKEN,
  WatchdogCauseCode,
  WatchdogActionTaken,
} from "./watchdog-event.model";

const INCIDENT_TYPES = ["CONNECTIVITY", "DEVICE"] as const;
const INCIDENT_STATUSES = ["OPEN", "CLOSED"] as const;

type IncidentType = (typeof INCIDENT_TYPES)[number];
type IncidentStatus = (typeof INCIDENT_STATUSES)[number];

interface IActionEntry {
  actionTaken: WatchdogActionTaken;
  at: Date;
}

interface IIncident extends Document {
  incidentId: string;
  incidentType: IncidentType;
  status: IncidentStatus;
  plantId: string;
  plcId: string;
  deviceId: string;
  currentCause: WatchdogCauseCode | null;
  actionHistory: IActionEntry[];
  startedAt: Date;
  recoveredAt: Date | null;
  downtimeSeconds: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const incidentSchema = new Schema<IIncident>(
  {
    incidentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    incidentType: {
      type: String,
      required: true,
      enum: INCIDENT_TYPES,
    },
    status: {
      type: String,
      required: true,
      enum: INCIDENT_STATUSES,
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
    currentCause: {
      type: String,
      enum: [...WATCHDOG_CAUSE_CODES, null],
      default: null,
    },
    actionHistory: {
      type: [
        {
          _id: false,
          actionTaken: {
            type: String,
            required: true,
            enum: WATCHDOG_ACTIONS_TAKEN,
          },
          at: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
    startedAt: {
      type: Date,
      required: true,
    },
    recoveredAt: {
      type: Date,
      default: null,
    },
    downtimeSeconds: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

incidentSchema.index({ plantId: 1, status: 1 });
incidentSchema.index({ deviceId: 1, status: 1 });

const IncidentModel = mongoose.model<IIncident>(
  "watchdogIncidents",
  incidentSchema,
  "watchdogIncidents"
);

export {
  IncidentModel,
  IIncident,
  IActionEntry,
  INCIDENT_TYPES,
  INCIDENT_STATUSES,
  IncidentType,
  IncidentStatus,
};
