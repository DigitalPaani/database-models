import mongoose, { Schema, Document, Types } from "mongoose";

interface ITriggerLog extends Document {
  triggerId: Types.ObjectId;
  openTime?: number;
  closeTime?: number;
}

const triggerLogsSchema = new Schema<ITriggerLog>(
  {
    triggerId: { type: Schema.Types.ObjectId, ref: "triggers", required: true },
    openTime: { type: Number },
    closeTime: { type: Number },
  },
  { timestamps: true }
);

const TriggerLogsModel = mongoose.model<ITriggerLog>(
  "triggerLogs",
  triggerLogsSchema,
  "triggerLogs"
);

export { TriggerLogsModel, ITriggerLog };
