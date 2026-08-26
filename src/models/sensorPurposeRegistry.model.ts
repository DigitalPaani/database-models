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
  technologyTypes?: string[];
  signalTypes?: string[];
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
    technologyTypes: { type: [String], required: false },
    signalTypes: { type: [String], required: false },
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
