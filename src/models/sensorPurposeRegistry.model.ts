import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface ISensorPurposeRegistry extends Document {
  tag: string;
  name: string;
  category: string;
  description?: string;
  allowedUnits?: string[];
  waterQualityFlag?: boolean;
  dataType?: "float" | "boolean" | "string" | "integer";
}

const sensorPurposeRegistrySchema = new Schema<ISensorPurposeRegistry>(
  {
    tag: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    allowedUnits: [String],
    waterQualityFlag: { type: Boolean, required: false },
    dataType: {
      type: String,
      enum: ["float", "boolean", "string", "integer"],
    },
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
