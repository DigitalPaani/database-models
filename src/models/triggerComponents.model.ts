import mongoose, { Schema } from "mongoose";
import { TRIGGER_COMPONENT_TYPES } from "../constants/triggerConst";
import type { Document, Model, Types } from "mongoose";

interface ITriggerComponent extends Document {
  componentName: string;
  type: string;
  triggerId: Types.ObjectId;
  isDeleted: boolean; // Default is false
  createdAt?: Date; // From Mongoose timestamps
  updatedAt?: Date; // From Mongoose timestamps
}

const triggerComponentSchema = new Schema(
  {
    componentName: {
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
    triggerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "triggers",
      required: true,
    },
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
