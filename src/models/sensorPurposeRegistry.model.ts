import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface ISensorPurposeRegistry extends Document {
  tag: string;
  name: string;
  category: string;
  description?: string;
  waterQualityFlag?: boolean;
  dataType?: "float" | "boolean" | "string" | "integer";
  units?: string[];
  technologyType?: string;
  signalType?: string;
}

const sensorPurposeRegistrySchema = new Schema<ISensorPurposeRegistry>(
  {
    tag: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    waterQualityFlag: { type: Boolean, required: false },
    dataType: {
      type: String,
      enum: ["float", "boolean", "string", "integer"],
    },
    units: { type: [String], required: false },
    technologyType: { type: String, required: false },
    signalType: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const SensorPurposeRegistryModel: Model<ISensorPurposeRegistry> =
  mongoose.model<ISensorPurposeRegistry>(
    "SensorPurposeRegistry",
    sensorPurposeRegistrySchema,
    "sensorPurposeRegistries"
  );

export { SensorPurposeRegistryModel, ISensorPurposeRegistry };
