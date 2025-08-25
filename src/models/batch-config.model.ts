import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { BATCH_DETECTION_ENUM, BATCH_STATUS_ENUM, BATCH_TYPE_ENUM, WATER_TREATMENT_UNIT_ENUM } from "../constants/batch.constants";

export interface IStatusCondition {
  status: string[];
  condition: string;
}

interface IBatchConfig extends Document {
  plantId: Types.ObjectId;

  batchName: string;
  batchEquipments: string[];

  detectionLogic: {
    primary: string[]
    secondary?: string[];
  };

  trackingSensors: Types.ObjectId[];

  batchFlow: {
    startEquipment: Types.ObjectId;
    endEquipment: Types.ObjectId;
  };

  chemicalUsage: Types.ObjectId[];

  waterTreatmentUnit?: {
    unit?: string;
    value?: number;
  };

  batchType: string;
  batchPurpose?: string;

  statusConditions: IStatusCondition[];

  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}

const batchStatusSchema = new Schema<IStatusCondition>(
  {
    status: {
      type: [String],
      enum: Object.values(BATCH_STATUS_ENUM),
      required: true,
    },
    condition: { type: String, ref:"sensors", required: true },
  }
);

const batchConfigSchema = new Schema<IBatchConfig>(
  {
    plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },

    batchName: { type: String, required: true },

    batchEquipments: {
      type: [String],
      ref: 'LayoutEquipments',
      required: true,
    },

    detectionLogic: {
      primary: {
        type: String,
        enum: Object.values(BATCH_DETECTION_ENUM),
        required: true,
      },
      secondary: {
        type: String,
        ref: "sensors"
      },
    },

    trackingSensors: [{ type: Schema.Types.ObjectId, ref: "sensors" }],

    batchFlow: {
      startEquipment: { type: Types.ObjectId, ref: "LayoutEquipments" },
      endEquipment: { type: Types.ObjectId, ref: "LayoutEquipments" },
    },

    chemicalUsage: [{ type: Schema.Types.ObjectId, ref: "Chemical" }],

    waterTreatmentUnit: {
      unit: { type: String, enum:Object.values(WATER_TREATMENT_UNIT_ENUM) },
      value: { type: Number },
    },

    batchType: {
      type: String,
      enum: Object.values(BATCH_TYPE_ENUM),
      default: "Regular",
    },

    batchPurpose: { type: String, default: "" },

    statusConditions: [batchStatusSchema],

    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BatchConfigModel: Model<IBatchConfig> = mongoose.model<IBatchConfig>(
  "batch_configs",
  batchConfigSchema,
  "batch_configs"
);

export { BatchConfigModel, IBatchConfig };
