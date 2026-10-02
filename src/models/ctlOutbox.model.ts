import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { DAY_MS } from "../constants/closeTheLoop.constants";

export interface CtlOutboxDoc {
  _id: Types.ObjectId;
  eventType: string;
  aggregateId: string;
  payload: Record<string, unknown>;
  occurredAt: Date;
  nextAttemptAt: Date;
  publishedAt: Date | null;
  deadAt: Date | null;
  attempts: number;
  lastError: string | null;
}

const PUBLISHED_RETENTION_SECONDS = (7 * DAY_MS) / 1000;
const DEAD_RETENTION_SECONDS = (30 * DAY_MS) / 1000;

const ctlOutboxSchema = new Schema<CtlOutboxDoc>(
  {
    eventType: { type: String, required: true },
    aggregateId: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    occurredAt: { type: Date, required: true },
    nextAttemptAt: { type: Date, required: true },
    publishedAt: { type: Date, default: null },
    deadAt: { type: Date, default: null },
    attempts: { type: Number, required: true, default: 0 },
    lastError: { type: String, default: null },
  },
  {
    timestamps: false,
    minimize: false,
  },
);

ctlOutboxSchema.index({ publishedAt: 1, deadAt: 1, nextAttemptAt: 1, _id: 1 });
ctlOutboxSchema.index(
  { publishedAt: 1 },
  { expireAfterSeconds: PUBLISHED_RETENTION_SECONDS },
);
ctlOutboxSchema.index(
  { deadAt: 1 },
  { expireAfterSeconds: DEAD_RETENTION_SECONDS },
);

const CtlOutboxModel: Model<CtlOutboxDoc> = mongoose.model<CtlOutboxDoc>(
  "CtlOutboxEvent",
  ctlOutboxSchema,
  "ctlOutbox",
);

export default CtlOutboxModel;
