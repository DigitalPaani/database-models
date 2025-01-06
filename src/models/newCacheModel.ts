import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { FormulaCommonTypes } from "../types/formulaTypes";

interface INewCache extends Document {
  sensorTag: string;
  sensorSettingId: Types.ObjectId;
  details: FormulaCommonTypes.SensorSetting;
  values: Array<{
    timestamp: number;
    value: string[];
  }>;
}

const newCacheSchema = new Schema<INewCache>(
  {
    sensorTag: {
      type: String,
      required: true,
      trim: true,
    },
    sensorSettingId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "SensorSettings",
    },
    details: {
      type: Object,
      required: true,
    },
    values: [
      {
        timestamp: {
          type: Number, // Assuming epoch is stored as a number
          required: true,
        },
        value: {
          type: [Schema.Types.Mixed], // Can be a Number, String, or Array
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const NewCacheModel: Model<INewCache> = mongoose.model<INewCache>(
  "newCache",
  newCacheSchema,
  "newCaches"
);

export { NewCacheModel, INewCache };
