import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  DAY_MS,
  LADDER_STEPS,
  TimedStep,
} from "../constants/closeTheLoop.constants";

export const TIMER_KINDS = [
  "LADDER_STEP",
  "DIGEST",
  "SWEEP",
  "HOOTER_WATCHDOG",
] as const;
export type TimerKind = (typeof TIMER_KINDS)[number];

export const TIMER_STATUSES = [
  "PENDING",
  "CLAIMED",
  "DONE",
  "SKIPPED",
  "CANCELLED",
  "DEAD",
] as const;
export type TimerStatus = (typeof TIMER_STATUSES)[number];

export interface CtlTimerDoc {
  _id: Types.ObjectId;
  kind: TimerKind;
  ladderId: Types.ObjectId | null;
  issueId: Types.ObjectId | null;
  plantId: Types.ObjectId | null;
  step: TimedStep | null;
  generation: number;
  dueAt: Date;
  status: TimerStatus;
  leaseUntil: Date | null;
  claimedBy: string | null;
  attempts: number;
  lastError: string | null;
  completedAt: Date | null;
  singletonKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const TIMER_RETENTION_SECONDS = (7 * DAY_MS) / 1000;

const ctlTimerSchema = new Schema<CtlTimerDoc>(
  {
    kind: { type: String, enum: [...TIMER_KINDS], required: true },
    ladderId: { type: Schema.Types.ObjectId, default: null },
    issueId: { type: Schema.Types.ObjectId, default: null },
    plantId: { type: Schema.Types.ObjectId, default: null },
    step: { type: String, enum: [...LADDER_STEPS, null], default: null },
    generation: { type: Number, required: true, default: 0 },
    dueAt: { type: Date, required: true },
    status: {
      type: String,
      enum: [...TIMER_STATUSES],
      required: true,
      default: "PENDING",
    },
    leaseUntil: { type: Date, default: null },
    claimedBy: { type: String, default: null },
    attempts: { type: Number, required: true, default: 0 },
    lastError: { type: String, default: null },
    completedAt: { type: Date, default: null },
    singletonKey: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

ctlTimerSchema.index({ status: 1, dueAt: 1 });
ctlTimerSchema.index({ ladderId: 1, generation: 1, status: 1 });
ctlTimerSchema.index(
  { status: 1, leaseUntil: 1 },
  { partialFilterExpression: { status: "CLAIMED" } },
);
ctlTimerSchema.index(
  { completedAt: 1 },
  { expireAfterSeconds: TIMER_RETENTION_SECONDS },
);
ctlTimerSchema.index(
  { singletonKey: 1 },
  {
    unique: true,
    partialFilterExpression: { singletonKey: { $type: "string" } },
  },
);

const CtlTimerModel: Model<CtlTimerDoc> = mongoose.model<CtlTimerDoc>(
  "CtlTimer",
  ctlTimerSchema,
  "ctlTimers",
);

export default CtlTimerModel;