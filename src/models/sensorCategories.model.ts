import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { SENSOR_PURPOSE_TAGS } from "../constants/sensorConst";

interface ISensorCategory extends Document {
  key: string;
  abbr: string;
  name: string;
  isDeprecated: boolean;
}

const sensorCategorySchema = new Schema<ISensorCategory>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: SENSOR_PURPOSE_TAGS.map((tag) => tag.key),
    },
    abbr: {
      type: String,
      required: true,
      unique: true,
      enum: SENSOR_PURPOSE_TAGS.map((tag) => tag.abbr),
    },
    name: {
      type: String,
      required: true,
      unique: true,
      enum: SENSOR_PURPOSE_TAGS.map((tag) => tag.name),
    },
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
