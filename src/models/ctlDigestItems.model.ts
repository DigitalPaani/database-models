import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  DAY_MS,
  DIGEST_ITEM_KINDS,
  DigestItemKind,
  LADDER_STEPS,
  LadderStep,
  SEVERITIES,
  Severity,
} from "../constants/closeTheLoop.constants";

export type { DigestItemKind };

export interface CtlDigestItemDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  plantId: Types.ObjectId;
  issueId: Types.ObjectId | null;
  generation: number;
  step: LadderStep;
  severity: Severity;
  kind: DigestItemKind;
  dedupKey: string;
  digestDateKey: string;
  title: string;
  sentAt: Date | null;
  createdAt: Date;
}

const DIGEST_RETENTION_SECONDS = (30 * DAY_MS) / 1000;

const ctlDigestItemSchema = new Schema<CtlDigestItemDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
    plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
    issueId: { type: Schema.Types.ObjectId, default: null },
    generation: { type: Number, required: true, default: 0 },
    step: { type: String, enum: [...LADDER_STEPS], required: true },
    severity: { type: String, enum: [...SEVERITIES], required: true },
    kind: { type: String, enum: [...DIGEST_ITEM_KINDS], required: true },
    dedupKey: { type: String, required: true },
    digestDateKey: { type: String, required: true },
    title: { type: String, required: true, default: "" },
    sentAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

ctlDigestItemSchema.index({ dedupKey: 1 }, { unique: true });
ctlDigestItemSchema.index({ sentAt: 1, userId: 1, digestDateKey: 1 });
ctlDigestItemSchema.index({ userId: 1, createdAt: -1 });
ctlDigestItemSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: DIGEST_RETENTION_SECONDS },
);

const CtlDigestItemModel: Model<CtlDigestItemDoc> =
  mongoose.model<CtlDigestItemDoc>(
    "CtlDigestItem",
    ctlDigestItemSchema,
    "ctlDigestItems",
  );

export default CtlDigestItemModel;
