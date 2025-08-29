import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import batchConstants from "../constants/batch.constants";

export interface IStatusCondition {
  status: string;
  eventComponent: Types.ObjectId;
  action: string;
}

interface ITimeCycleRecurrence {
  frequency: string;
  interval: number;
  daysOfWeek: number[];
  dayOfMonth: number[];
  weekOfMonth: number[];
  hours: number[];
  minutes: number[];
}

interface ITimeCycleConfig {
  recurrence: ITimeCycleRecurrence;
  startDate?: Date;
  endDate?: Date;
}

interface IBatchComponent extends Document {
  assetId: Types.ObjectId;

  name: string;
  equipments: Types.ObjectId[];

  detectionType: string;

  startBatchEventComponentId?: Types.ObjectId;
  timeCycle?: ITimeCycleConfig;

  trackingSensors: Types.ObjectId[];

  flow: {
    nodes: unknown[];
    edges: unknown[];
  };

  chemicalUsage?: {
    chemicalName: string;
    itemId: Types.ObjectId;
  }[];

  waterTreatment?: {
    unit?: string;
    value?: number;
  };

  type: string;
  purpose?: string;

  startTriggerId?: Types.ObjectId;
  endTriggerId?: Types.ObjectId;

  statusConditions: IStatusCondition[];
  isArchived: boolean;

  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const BATCH_STATUS_ALLOWED = [
  ...Object.values(batchConstants.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
  ...Object.values(batchConstants.BATCH_DETECTION_ENUM),
];
const BATCH_TYPE_ALLOWED = [...Object.values(batchConstants.BATCH_TYPE_ENUM)];
const WATER_TREATMENT_UNIT_ALLOWED = [
  ...Object.values(batchConstants.WATER_TREATMENT_UNIT_ENUM),
];
const BATCH_ACTION_ALLOWED = [...Object.values(batchConstants.BATCH_ACTION_ENUM)];

const batchStatusSchema = new Schema<IStatusCondition>({
  status: {
    type: String,
    enum: BATCH_STATUS_ALLOWED,
    required: true,
  },
  eventComponent: {
    type: Schema.Types.ObjectId,
    ref: "event-components",
    required: true,
  },
  action: {
    type: String,
    enum: BATCH_ACTION_ALLOWED,
    required: true,
  },
});

const timeCycleRecurrenceSchema = new Schema<ITimeCycleRecurrence>(
  {
    frequency: { type: String, required: true },
    interval: { type: Number, required: true },
    daysOfWeek: { type: [Number], default: [] },
    dayOfMonth: { type: [Number], default: [] },
    weekOfMonth: { type: [Number], default: [] },
    hours: {
      type: [Number],
      validate: {
        validator: function (values: number[]): boolean {
          return values.every((v) => v >= 0 && v <= 23);
        },
        message: "Hours should be between 0 and 23.",
      },
      default: [],
    },
    minutes: {
      type: [Number],
      validate: {
        validator: function (values: number[]): boolean {
          return values.every((v) => v >= 0 && v <= 59);
        },
        message: "Minutes should be between 0 and 59.",
      },
      default: [],
    },
  },
  { _id: false }
);

const timeCycleSchema = new Schema<ITimeCycleConfig>({
  recurrence: { type: timeCycleRecurrenceSchema, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
});

const waterTreatmentSchema = new Schema({
  unit: { type: String, enum: WATER_TREATMENT_UNIT_ALLOWED },
  value: { type: Number },
});

const batchComponentSchema = new Schema<IBatchComponent>(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },

    name: { type: String, required: true },

    equipments: {
      type: [Schema.Types.ObjectId],
      ref: "LayoutEquipments",
      required: true,
    },
    detectionType: {
      type: String,
      enum: BATCH_DETECTION_ALLOWED,
      required: true,
    },
    startBatchEventComponentId: {
      type: Schema.Types.ObjectId,
      ref: "event-components",
      required: false,
    },
    timeCycle: {
      type: timeCycleSchema,
      required: false,
    },

    trackingSensors: [{ type: Schema.Types.ObjectId, ref: "sensors" }],

    flow: {
      nodes: { type: [Schema.Types.Mixed], default: [] },
      edges: { type: [Schema.Types.Mixed], default: [] },
    },
    chemicalUsage: {
      type: [
        {
          itemId: {
            type: Schema.Types.ObjectId,
            ref: "StoreItems",
            required: true,
          },
          name: { type: String, required: true },
        },
      ],
      required: false,
    },

    waterTreatment: { type: waterTreatmentSchema },

    type: {
      type: String,
      enum: BATCH_TYPE_ALLOWED,
      default: "Regular",
    },

    purpose: { type: String, default: "" },

    startTriggerId: { type: Types.ObjectId, ref: "triggers", required: false },

    endTriggerId: { type: Types.ObjectId, ref: "triggers", required: false },

    statusConditions: {
      type: [batchStatusSchema],
    },

    isArchived: { type: Boolean, default: false },
    createdBy: { type: Types.ObjectId, ref: "User" },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BatchComponentModel: Model<IBatchComponent> = mongoose.model<IBatchComponent>(
  "batch-components",
  batchComponentSchema,
  "batch-components"
);

export { BatchComponentModel, IBatchComponent };
