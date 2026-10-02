import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  LADDER_STEPS,
  READING_TRENDS,
  SEVERITIES,
} from "../constants/closeTheLoop.constants";
import type { LadderStep, ReadingTrend, Severity } from "../constants/closeTheLoop.constants";

export const LADDER_STATUSES = ["OPEN", "CLOSED"] as const;
export type LadderStatus = (typeof LADDER_STATUSES)[number];

/** The measurement that crossed the rule's threshold, as the trigger sent it. Same shape on the feed, the push and the landing page. */
export interface LadderReading {
  value: number;
  unit: string;
  /** Free text on what normal looks like, e.g. "alarm above 80". */
  band: string | null;
  trend: ReadingTrend | null;
}

export interface CtlLadderDoc {
  _id: Types.ObjectId;
  issueId: Types.ObjectId;
  plantId: Types.ObjectId;
  title: string;
  plantName: string;
  severity: Severity;
  peakSeverity: Severity;
  openedAt: Date;
  anchorAt: Date;
  generation: number;
  currentStep: LadderStep;
  status: LadderStatus;
  startedAt: Date | null;
  /** Who holds it. Take-over moves this, and the feed shows it. */
  startedBy: Types.ObjectId | null;
  /** Hand-off times while unstarted, trimmed to HANDOFF_WINDOW_MS in the same write that adds one. */
  handoffs: Date[];
  closedAt: Date | null;
  lastAlertAt: Date | null;
  lastAlertSeverity: Severity | null;
  hooterFiredAt: Date | null;
  /**
   * When someone pressed Start on the Emergency (the alarm's "Start and silence").
   * Kept apart from the device's own acknowledgement on the HOOTER attempt: the
   * "hooter may not have sounded" watchdog must still hear about a device that
   * never answered, whoever tapped Start.
   */
  hooterSilencedAt: Date | null;
  hooterSilencedBy: Types.ObjectId | null;
  /** From the trigger's ingest payload when it sends them; null until then. */
  area: string | null;
  equipment: string | null;
  reading: LadderReading | null;
  /** Who closed the Issue, when /ingest/issue-closed says. */
  closedBy: Types.ObjectId | null;
  suppressedAlerts: number;
  createdAt: Date;
  updatedAt: Date;
}

const readingSchema = new Schema<LadderReading>(
  {
    value: { type: Number, required: true },
    unit: { type: String, default: "" },
    band: { type: String, default: null },
    trend: { type: String, enum: [...READING_TRENDS, null], default: null },
  },
  { _id: false },
);

const ctlLadderSchema = new Schema<CtlLadderDoc>(
  {
    issueId: { type: Schema.Types.ObjectId, required: true },
    plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
    title: { type: String, required: true, default: "" },
    // Not required: Mongoose refuses '' for a required string, and a plant with no name
    // on the platform reads back as '' — every open at that plant would fail.
    plantName: { type: String, default: "" },
    severity: { type: String, enum: [...SEVERITIES], required: true },
    peakSeverity: { type: String, enum: [...SEVERITIES], required: true },
    openedAt: { type: Date, required: true },
    anchorAt: { type: Date, required: true },
    generation: { type: Number, required: true, default: 1 },
    currentStep: {
      type: String,
      enum: [...LADDER_STEPS],
      required: true,
      default: "OPENED",
    },
    status: {
      type: String,
      enum: [...LADDER_STATUSES],
      required: true,
      default: "OPEN",
    },
    startedAt: { type: Date, default: null },
    startedBy: { type: Schema.Types.ObjectId, ref: "NewUser", default: null },
    handoffs: { type: [Date], required: true, default: [] },
    closedAt: { type: Date, default: null },
    lastAlertAt: { type: Date, default: null },
    lastAlertSeverity: {
      type: String,
      enum: [...SEVERITIES, null],
      default: null,
    },
    hooterFiredAt: { type: Date, default: null },
    hooterSilencedAt: { type: Date, default: null },
    hooterSilencedBy: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      default: null,
    },
    area: { type: String, default: null },
    equipment: { type: String, default: null },
    reading: { type: readingSchema, default: null },
    closedBy: { type: Schema.Types.ObjectId, ref: "NewUser", default: null },
    suppressedAlerts: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

ctlLadderSchema.index(
  { issueId: 1 },
  { unique: true, partialFilterExpression: { status: "OPEN" } },
);
ctlLadderSchema.index({ issueId: 1, createdAt: -1 });

const CtlLadderModel: Model<CtlLadderDoc> = mongoose.model<CtlLadderDoc>(
  "CtlLadder",
  ctlLadderSchema,
  "ctlLadders",
);

export default CtlLadderModel;
