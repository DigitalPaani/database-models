import mongoose, { Schema, Document } from "mongoose";
import { Types } from "..";

// Sub-schema for each escalation step
const escalationStepSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
      },
    ],
  },
  { _id: false }
);

// Interface
interface IEscalationFlow extends Document {
  attendenceManager: Types.ObjectId[];
  rosterManager: Types.ObjectId[];
  operator: Types.ObjectId[];
  userGroup: Types.ObjectId;
  assets: Types.ObjectId[];
  modules: string[];
  escalations: (typeof escalationStepSchema)[];
}

// Main schema
const escalationFlowSchema = new Schema<IEscalationFlow>(
  {
    attendenceManager: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    rosterManager: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    operator: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: true,
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    modules: {
      type: [String],
      default: [],
    },
    escalations: [escalationStepSchema],
  },
  { timestamps: true }
);

// Model
const EscalationFlowModel = mongoose.model<IEscalationFlow>(
  "EscalationFlow",
  escalationFlowSchema,
  "escalationFlow"
);

export { IEscalationFlow, EscalationFlowModel };
