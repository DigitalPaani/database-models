import mongoose from "mongoose";
import {
  COMPONENT_NAMES,
  CONDITION_THRESHOLD_TYPES,
  CONDITIONAL_OPERATORS,
  RECURRENCE_FREQUENCY_TYPES,
  TRIGGER_SCOPE,
  TRIGGER_TYPES,
} from "../constants/triggerConst";
import type { Document, Model, Types } from "mongoose";
import type { TriggerTypes } from "../types/triggerTypes";

const Schema = mongoose.Schema;

interface ITriggerDocument extends Document {
  name: string;
  description: string;
  dateAsText?: string;
  scope: (typeof TRIGGER_SCOPE)[keyof typeof TRIGGER_SCOPE];
  userGroup?: Types.ObjectId; // Array of ObjectId references
  type: (typeof TRIGGER_TYPES)[keyof typeof TRIGGER_TYPES];
  startDate?: number;
  endDate?: number;
  totalOccurrence?: number;
  occurrenceLeft?: number;
  recurrence?: TriggerTypes.Recurrence;
  conditions?: TriggerTypes.Conditions;
  triggerComponent: TriggerTypes.TriggerData[];
  createdBy: Types.ObjectId; // ObjectId reference
  isActive: boolean; // Default is true
  isDeleted: boolean; // Default is false
  createdAt?: Date; // From Mongoose timestamps
  updatedAt?: Date; // From Mongoose timestamps
}

const recurrenceSchema = new Schema({
  frequency: {
    type: String,
    enum: Object.values(RECURRENCE_FREQUENCY_TYPES),
  },
  interval: {
    type: Number,
    default: 1, // e.g., every 1 day, 2 weeks, etc.
  },
  daysOfWeek: {
    type: [Number], // e.g., 0 is monday and 6 is sunday, etc.
    validate: {
      validator: function (values: number[]): boolean {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return min >= 0 && max <= 6;
      },
      message: "Array numbers should have values between 0 and 6.",
    },
    default: [],
  },
  dayOfMonth: {
    type: [Number], // e.g., 1 for the first day of the month
  },
  weekOfMonth: {
    type: [Number],
  },
  month: {
    type: [Number], // e.g., 1 for January (used for yearly recurrence)
  },
});

const triggerConditionSchema = new Schema({
  operator: {
    type: String,
    required: true,
    enum: Object.values(CONDITIONAL_OPERATORS),
  },
  sensorTag: {
    type: String,
    required: true,
    trim: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
  thresholdType: {
    type: String,
    required: true,
    enum: Object.values(CONDITION_THRESHOLD_TYPES),
  },
});

const triggerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dateAsText: {
      type: String,
      trim: true,
    },
    scope: {
      type: String,
      required: true,
      enum: Object.values(TRIGGER_SCOPE),
    },
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(TRIGGER_TYPES),
    },
    startDate: { type: Number },
    endDate: { type: Number },
    totalOccurrence: { type: Number },
    occurrenceLeft: { type: Number },
    recurrence: { type: recurrenceSchema, required: false },
    conditions: {
      type: {
        resolutionFreq: Number,
        observationFreq: Number,
        resolutionConditions: [[triggerConditionSchema]],
        observationConditions: [[triggerConditionSchema]],
      },
      required: false,
    },
    triggerComponent: {
      type: [
        {
          componentName: {
            type: String,
            enum: Object.values(COMPONENT_NAMES),
          },
          componentData: Object,
        },
      ],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const TriggerModel: Model<ITriggerDocument> = mongoose.model<ITriggerDocument>(
  "triggers",
  triggerSchema,
  "triggers"
);

export { TriggerModel, ITriggerDocument };
