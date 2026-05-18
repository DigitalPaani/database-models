import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface ISensorPurposeTag extends Document {
  key: string;
  abbr: string;
  name: string;
  category: string;
  isDeprecated: boolean;
}

const sensorPurposeTagSchema = new Schema<ISensorPurposeTag>(
  {
    key: { type: String, required: true, unique: true },
    abbr: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SensorPurposeTagModel: Model<ISensorPurposeTag> =
  mongoose.model<ISensorPurposeTag>(
    "SensorPurposeTag",
    sensorPurposeTagSchema,
    "sensorPurposeTags"
  );

export { SensorPurposeTagModel, ISensorPurposeTag };