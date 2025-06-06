import mongoose, { Schema } from "mongoose";
import {
  COMPONENT_NAMES,
  RECURRENCE_FREQUENCY_TYPES,
  TRIGGER_SCOPE,
  TRIGGER_STATUS,
  TRIGGER_TYPES,
} from "../constants/triggerConst";
import type { Document, Model, Types } from "mongoose";
import type { TriggerTypes } from "../types/triggerTypes";

interface ITriggerDocument extends Document {
  name: string;
  description: string;
  recurrenceText?: string;
  scope: (typeof TRIGGER_SCOPE)[keyof typeof TRIGGER_SCOPE];
  triggerTag: string;
  userGroup?: Types.ObjectId; // Array of ObjectId references
  workspace?: Types.ObjectId;
  assets?: Types.ObjectId[];
  type: (typeof TRIGGER_TYPES)[keyof typeof TRIGGER_TYPES];
  startDate?: number;
  endDate?: number;
  totalOccurrence?: number;
  recurrence?: TriggerTypes.Recurrence;
  conditions?: TriggerTypes.Conditions;
  triggerComponents: Types.ObjectId[];
  createdBy: Types.ObjectId; // ObjectId reference
  triggerSensorId: Types.ObjectId;
  status: string;
  isOpen: boolean;
  equipmentId?: Types.ObjectId;
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
  hours: {
    type: [Number], // 0-23, e.g., [9, 15] for 9 AM and 3 PM
    validate: {
      validator: function (values: number[]): boolean {
        return values.every((v) => v >= 0 && v <= 23);
      },
      message: "Hours should be between 0 and 23.",
    },
    default: [],
  },
  minutes: {
    type: [Number], // 0-59, e.g., [0, 30] for start of hour and half-past
    validate: {
      validator: function (values: number[]): boolean {
        return values.every((v) => v >= 0 && v <= 59);
      },
      message: "Minutes should be between 0 and 59.",
    },
    default: [],
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
    recurrenceText: {
      type: String,
      trim: true,
    },
    scope: {
      type: String,
      required: true,
      enum: Object.values(TRIGGER_SCOPE),
    },
    triggerTag: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: false,
    },
    workspace: {
      type: Schema.ObjectId,
      ref: "NewWorkspace",
    },
    assets: { type: [Schema.Types.ObjectId], ref: "Plant", required: false },
    type: {
      type: String,
      required: true,
      enum: Object.values(TRIGGER_TYPES),
    },
    startDate: { type: Number },
    endDate: { type: Number },
    totalOccurrence: { type: Number },
    recurrence: { type: recurrenceSchema, required: false },
    conditions: {
      type: {
        resolutionFreq: Number,
        observationFreq: Number,
        currentResolutionFreq: { type: Number, default: 0 },
        currentObservationFreq: { type: Number, default: 0 },
        resolutionSensorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "sensors",
        },
        observationSensorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "sensors",
        },
        resolutionValue: Number,
        resolutionUnit: String,
        resolutionTime: Number,
      },
      required: false,
    },
    triggerComponents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "triggerComponents",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    triggerSensorId: {
      type: Schema.Types.ObjectId,
      ref: "Sensors",
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TRIGGER_STATUS),
      default: TRIGGER_STATUS.active,
    },
    isOpen: { type: Boolean, required: true, default: false },
    equipmentId: { 
      type: Schema.Types.ObjectId,
      ref:"LayoutEquipments" 
    },
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
