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
<<<<<<< HEAD
    timeInMinutes: {
      type: Number,
      required: true,
    },
=======
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
<<<<<<< HEAD
        required: true,
=======
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
      },
    ],
  },
  { _id: false }
);

// Interface
interface IEscalationFlow extends Document {
<<<<<<< HEAD
  attendenceManager: Types.ObjectId[];
=======
  attendanceManager: Types.ObjectId[];
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
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
<<<<<<< HEAD
    attendenceManager: [
      {
        type: Schema.Types.ObjectId,
=======
    attendanceManager: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewUser",
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
      },
    ],
    rosterManager: [
      {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
=======
        ref: "NewUser",
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
      },
    ],
    operator: [
      {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
=======
        ref: "NewUser",
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
      },
    ],
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: true,
<<<<<<< HEAD
=======
      unique:true
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
=======
        ref: "Plant",
>>>>>>> 04951b40c78b1fb90e52113e07a56ab6329ad389
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
