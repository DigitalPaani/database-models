import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

/** One browser that asked for notifications (A4 "Allow", Profile "Turn on"). */
export interface CtlPushSubscriptionDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  /** The push service URL the browser handed us. Unique: one browser, one owner. */
  endpoint: string;
  keys: { p256dh: string; auth: string };
  expirationTime: number | null;
  device: { userAgent: string; installed: boolean };
  createdAt: Date;
  updatedAt: Date;
}

const ctlPushSubscriptionSchema = new Schema<CtlPushSubscriptionDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
    expirationTime: { type: Number, default: null },
    device: {
      userAgent: { type: String, default: "" },
      installed: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

ctlPushSubscriptionSchema.index({ endpoint: 1 }, { unique: true });
ctlPushSubscriptionSchema.index({ userId: 1, updatedAt: -1 });

const CtlPushSubscriptionModel: Model<CtlPushSubscriptionDoc> =
  mongoose.model<CtlPushSubscriptionDoc>(
    "CtlPushSubscription",
    ctlPushSubscriptionSchema,
    "ctlPushSubscriptions",
  );

export default CtlPushSubscriptionModel;
