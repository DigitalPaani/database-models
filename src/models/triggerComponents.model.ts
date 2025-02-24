import mongoose, { Schema } from "mongoose";
import { TRIGGER_COMPONENT_TYPES } from "../constants/triggerConst";
import type { Document, Model } from "mongoose";

interface ITriggerComponent extends Document {
  isDeleted: boolean; // Default is false
  createdAt?: Date; // From Mongoose timestamps
  updatedAt?: Date; // From Mongoose timestamps
}

const workflowActionSchema = new mongoose.Schema(
  {
    communication: { type: String, default: "" },
    users: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
      },
    ],
    action: { type: String },
    nodeName: { type: String },
  },
  { _id: false, strict: false }
);

const escalationSchema = new mongoose.Schema(
  {
    unit: { type: String },
    value: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId }],
    channel: { type: String },
  },
  { _id: false, strict: false }
);

const taskDataSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { _id: false, strict: false }
);

const triggerComponentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(TRIGGER_COMPONENT_TYPES),
      required: true,
      trim: true,
    },
    taskData: { type: taskDataSchema },
    asset: { type: mongoose.Schema.Types.ObjectId },
    assignMethod: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, default: null },
    expectedTime: { type: String },
    expectedUnit: { type: String },
    deadlineTime: { type: String },
    deadlineUnit: { type: String },
    dataInputTag: { type: String },
    escalations: [escalationSchema],
    workflowActions: [workflowActionSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false }
);

const TriggerComponentModel: Model<ITriggerComponent> =
  mongoose.model<ITriggerComponent>(
    "triggerComponents",
    triggerComponentSchema,
    "triggerComponents"
  );

export { TriggerComponentModel, ITriggerComponent };
