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
        ref: "NewUser",
      },
    ],
    rosterManager: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
      },
    ],
    operator: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
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
        ref: "Plant",
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
