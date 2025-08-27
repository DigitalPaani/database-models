import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import batchConstants from "../constants/batch.constants";

export interface IStatusCondition {
  status: string;
  event: Types.ObjectId;
  eventTag?: Types.ObjectId;
}

interface ITimeCycleRecurrence {
  frequency: string;
  interval: number;
  daysOfWeek: number[];
  dayOfMonth: number[];
  weekOfMonth: number[];
  month: number[];
}

interface ITimeCycleConfig {
  recurrence: ITimeCycleRecurrence;
  startDate?: Date;
  endDate?: Date;
  totalOccurrence?: number;
}

interface IBatchConfig extends Document {
  assetId: Types.ObjectId;

  batchName: string;
  batchEquipments: Types.ObjectId[];

  detectionLogic: {
    primary: string;
    selectedEvent?: Types.ObjectId; // event-component id
    timeCycle?: ITimeCycleConfig;
  };

  trackingSensors: Types.ObjectId[];

  batchFlow: {
    nodes: unknown[];
    edges: unknown[];
  };

  chemicalUsage: Types.ObjectId[];

  waterTreatment?: {
    unit?: string;
    value?: number;
  };

  batchType: string;
  batchPurpose?: string;

  statusConditions: IStatusCondition[];

  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

// Accept both enum KEYS (e.g., "PLANNED") and VALUES (e.g., "Planned")
const BATCH_STATUS_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_STATUS_ENUM),
  ...Object.values(batchConstants.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_DETECTION_ENUM),
  ...Object.values(batchConstants.BATCH_DETECTION_ENUM),
];
const BATCH_TYPE_ALLOWED = [
  ...Object.keys(batchConstants.BATCH_TYPE_ENUM),
  ...Object.values(batchConstants.BATCH_TYPE_ENUM),
];
const WATER_TREATMENT_UNIT_ALLOWED = [
  ...Object.keys(batchConstants.WATER_TREATMENT_UNIT_ENUM),
  ...Object.values(batchConstants.WATER_TREATMENT_UNIT_ENUM),
];

const batchStatusSchema = new Schema<IStatusCondition>({
  status: {
    type: String,
    enum: BATCH_STATUS_ALLOWED,
    required: true,
  },
  event: { type: Schema.Types.ObjectId, ref: "event-components", required: true },
  eventTag: { type: Schema.Types.ObjectId, ref: "sensors" },
});

// Time cycle schema for detection logic
const timeCycleRecurrenceSchema = new Schema<ITimeCycleRecurrence>(
  {
    frequency: { type: String, required: true },
    interval: { type: Number, required: true },
    daysOfWeek: { type: [Number], default: [] },
    dayOfMonth: { type: [Number], default: [] },
    weekOfMonth: { type: [Number], default: [] },
    month: { type: [Number], default: [] },
  },
  { _id: false }
);

const timeCycleSchema = new Schema<ITimeCycleConfig>(
  {
    recurrence: { type: timeCycleRecurrenceSchema, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    totalOccurrence: { type: Number },
  },
  { _id: false }
);

// Water treatment sub-schema (used for alias mapping)
const waterTreatmentSchema = new Schema(
  {
    unit: { type: String, enum: WATER_TREATMENT_UNIT_ALLOWED },
    value: { type: Number, }
  },
  { _id: false }
);

const batchConfigSchema = new Schema<IBatchConfig>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },

    batchName: { type: String, required: true, alias: "name" },

    batchEquipments: {
      type: [Schema.Types.ObjectId],
      ref: 'LayoutEquipments',
      required: true,
      alias: 'selectedEquipments',
    },

    detectionLogic: {
      primary: {
        type: String,
        enum: BATCH_DETECTION_ALLOWED,
        required: true,
        alias: 'detectionType',
      },
      selectedEvent: {
        type: Schema.Types.ObjectId,
        ref: "event-components",
        required: false,
      },
      timeCycle: {
        type: timeCycleSchema,
        required: false,
      },
    },

    trackingSensors: [{ type: Schema.Types.ObjectId, ref: "sensors" }],

    batchFlow: {
      nodes: { type: [Schema.Types.Mixed], default: [] },
      edges: { type: [Schema.Types.Mixed], default: [] },
    },

    chemicalUsage: { type: [Schema.Types.ObjectId], default: [] },

    waterTreatment: { type: waterTreatmentSchema, alias: 'waterTreatmentUnit' },

    batchType: {
      type: String,
      enum: BATCH_TYPE_ALLOWED,
      default: "Regular",
    },

    batchPurpose: { type: String, default: "", alias: "purpose" },

    statusConditions: { type: [batchStatusSchema], alias: 'attachedConditions' },

    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BatchConfigModel: Model<IBatchConfig> = mongoose.model<IBatchConfig>(
  "batch-configs",
  batchConfigSchema,
  "batch-configs"
);

export { BatchConfigModel, IBatchConfig };
