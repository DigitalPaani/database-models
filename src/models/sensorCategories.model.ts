import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface ISensorCategory extends Document {
  key: string;
  abbr: string;
  name: string;
  tag: string;
  isDeprecated: boolean;
  isDeleted: boolean;
}

const sensorCategorySchema = new Schema<ISensorCategory>(
  {
    key: { type: String, required: true, unique: true },
    abbr: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    tag: { type: String, required: true, unique: true },
    isDeprecated: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
const SensorCategoryModel: Model<ISensorCategory> =
  mongoose.model<ISensorCategory>(
    "sensorCategories",
    sensorCategorySchema,
    "sensorCategories"
  );

export { SensorCategoryModel, ISensorCategory };
