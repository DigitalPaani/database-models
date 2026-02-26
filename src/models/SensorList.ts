import mongoose, { Schema, Document, Types } from "mongoose";
import { SENSOR_PURPOSE_TAGS, sensorInputType } from "../constants/sensorConst";

interface ISensor extends Document {
  sensorName: string;
  sensorCompanyId: Types.ObjectId;
  sensorModelNumber: string;
  granularity: string[];
  purpose: string[];
  inputType: string[];
  tags: string[];
  goodRange: {
    min: number;
    max: number;
  };
  warningRange: {
    min: number;
    max: number;
  };
  badRange: {
    min: number;
    max: number;
  };
}

const SensorSchema = new Schema<ISensor>(
  {
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "company",
    },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true },
    purpose: {
      type: [String],
      enum: SENSOR_PURPOSE_TAGS.map((tag) => tag.key),
    },
    inputType: {
      type: [String],
      enum: sensorInputType, // Restricts values to these three options
    },
    tags: { type: [String], default: [] },
    goodRange: {
      min: { type: Number, required: false },
      max: { type: Number, required: false },
    },
    warningRange: {
      min: { type: Number, required: false },
      max: { type: Number, required: false },
    },
    badRange: {
      min: { type: Number, required: false },
      max: { type: Number, required: false },
    },
  },
  { timestamps: true },
);

const SensorModel = mongoose.model<ISensor>(
  "SensorList",
  SensorSchema,
  "SensorLists"
);

export { SensorModel, ISensor };
