import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  SENSOR_SETTING_AGGREGATION,
  SENSOR_SETTING_GRANULARITY,
  SENSOR_SETTING_RETURN_TYPES,
} from "../constants/formulaConst";

interface ISensorSetting extends Document {
  sensorId: Types.ObjectId;
  sensorTag: string;
  granularity: "Minutes" | "Hours" | "Days" | "Weeks" | "Months";
  aggregation: "Average" | "Current" | "Minimum" | "Maximum" | "Cumulative";
  firstReferenceTimeInMinutes: number;
  lastReferenceTimeInMinutes: number;
  returnType: "values" | "value" | "datetime";
}

const sensorSettingsSchema = new Schema<ISensorSetting>(
  {
    sensorId: { type: Schema.Types.ObjectId, ref: "Sensors", required: true },
    sensorTag: { type: String, required: true, trim: true },
    granularity: {
      type: String,
      enum: SENSOR_SETTING_GRANULARITY,
      default: "Minutes",
      required: true,
    },
    aggregation: {
      type: String,
      enum: SENSOR_SETTING_AGGREGATION,
      required: true,
      default: "Current",
    },
    firstReferenceTimeInMinutes: {
      type: Number,
      required: true,
      default: 1,
    },
    lastReferenceTimeInMinutes: {
      type: Number,
      required: true,
      default: 0,
    },
    returnType: {
      type: String,
      enum: SENSOR_SETTING_RETURN_TYPES,
      required: true,
      default: "value",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const SensorSettingsModel: Model<ISensorSetting> =
  mongoose.model<ISensorSetting>(
    "SensorSettings",
    sensorSettingsSchema,
    "sensorSettings"
  );

export { SensorSettingsModel, ISensorSetting };
