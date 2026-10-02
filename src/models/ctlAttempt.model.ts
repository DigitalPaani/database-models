import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  Channel,
  CHANNELS,
  DAY_MS,
  LADDER_STEPS,
  LadderStep,
  Language,
  LANGUAGES,
  ROUTE_REASONS,
  RouteReason,
  SEVERITIES,
  Severity,
} from "../constants/closeTheLoop.constants";

export const ATTEMPT_STATUSES = [
  "PENDING",
  "SENDING",
  "SENT",
  "FAILED",
  "DEAD",
  "ACKED",
  "UNACKED",
] as const;
export type AttemptStatus = (typeof ATTEMPT_STATUSES)[number];

export const ATTEMPT_KINDS = [
  "LADDER",
  "NAMED",
  "WATCHDOG",
  "COVERAGE",
  "DIGEST",
] as const;
export type AttemptKind = (typeof ATTEMPT_KINDS)[number];

export interface AttemptPayload {
  to: string;
  language: Language;
  templateKey: string;
  message: string;
  link: string | null;
  emailSubject: string | null;
  code: string;
  /** Hooter commands only: how long the device should sound. */
  durationSec: number | null;
}

export interface CtlAttemptDoc {
  _id: Types.ObjectId;
  idempotencyKey: string;
  kind: AttemptKind;
  issueId: Types.ObjectId | null;
  ladderId: Types.ObjectId | null;
  plantId: Types.ObjectId | null;
  userId: Types.ObjectId | null;
  channel: Channel;
  severity: Severity;
  step: LadderStep;
  generation: number;
  reason: RouteReason;
  status: AttemptStatus;
  attempts: number;
  nextRetryAt: Date | null;
  claimedAt: Date | null;
  claimedBy: string | null;
  providerRef: string | null;
  lastError: string | null;
  sentAt: Date | null;
  ackDeadlineAt: Date | null;
  ackedAt: Date | null;
  payload: AttemptPayload;
  createdAt: Date;
  updatedAt: Date;
}

const ATTEMPT_RETENTION_SECONDS = (90 * DAY_MS) / 1000;

const payloadSchema = new Schema<AttemptPayload>(
  {
    to: { type: String, required: true },
    language: { type: String, enum: [...LANGUAGES], required: true },
    templateKey: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String, default: null },
    emailSubject: { type: String, default: null },
    code: { type: String, required: true },
    durationSec: { type: Number, default: null },
  },
  { _id: false },
);

const ctlAttemptSchema = new Schema<CtlAttemptDoc>(
  {
    idempotencyKey: { type: String, required: true },
    kind: { type: String, enum: [...ATTEMPT_KINDS], required: true },
    issueId: { type: Schema.Types.ObjectId, default: null },
    ladderId: { type: Schema.Types.ObjectId, default: null },
    plantId: { type: Schema.Types.ObjectId, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "NewUser", default: null },
    channel: { type: String, enum: [...CHANNELS], required: true },
    severity: { type: String, enum: [...SEVERITIES], required: true },
    step: { type: String, enum: [...LADDER_STEPS], required: true },
    generation: { type: Number, required: true },
    reason: { type: String, enum: [...ROUTE_REASONS], required: true },
    status: {
      type: String,
      enum: [...ATTEMPT_STATUSES],
      required: true,
      default: "PENDING",
    },
    attempts: { type: Number, required: true, default: 0 },
    nextRetryAt: { type: Date, default: null },
    claimedAt: { type: Date, default: null },
    claimedBy: { type: String, default: null },
    providerRef: { type: String, default: null },
    lastError: { type: String, default: null },
    sentAt: { type: Date, default: null },
    ackDeadlineAt: { type: Date, default: null },
    ackedAt: { type: Date, default: null },
    payload: { type: payloadSchema, required: true },
  },
  {
    timestamps: true,
  },
);

ctlAttemptSchema.index({ idempotencyKey: 1 }, { unique: true });
ctlAttemptSchema.index(
  { userId: 1, channel: 1, createdAt: -1 },
  { partialFilterExpression: { channel: "IN_APP" } },
);
ctlAttemptSchema.index(
  { status: 1, nextRetryAt: 1 },
  { partialFilterExpression: { status: "FAILED" } },
);
ctlAttemptSchema.index(
  { status: 1, claimedAt: 1 },
  { partialFilterExpression: { status: "SENDING" } },
);
ctlAttemptSchema.index(
  { status: 1, createdAt: 1 },
  { partialFilterExpression: { status: "PENDING" } },
);
ctlAttemptSchema.index(
  { status: 1, ackDeadlineAt: 1 },
  { partialFilterExpression: { channel: "HOOTER" } },
);
ctlAttemptSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: ATTEMPT_RETENTION_SECONDS },
);
// The Site Settings failed-messages count reads one plant's rows by time. A plain index, not a
// partial one: a partial filter with $in needs MongoDB 6.0+, and an older server skips the build silently.
ctlAttemptSchema.index({ plantId: 1, createdAt: -1 });

const CtlAttemptModel: Model<CtlAttemptDoc> = mongoose.model<CtlAttemptDoc>(
  "CtlAttempt",
  ctlAttemptSchema,
  "ctlAttempts",
);

export default CtlAttemptModel;
