import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { FormulaCommonTypes } from "../types/formulaTypes";

interface INewCache extends Document {
  sensorTag: string;
  sensorSettingId: Types.ObjectId;
  details: FormulaCommonTypes.SensorSetting;
  values: Array<{
    timestamp: number;
    value: number[];
    aggregatedValue: number[];
    isCalculated: boolean;
    expiresAt: Date; // Added field for TTL
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
          type: [Number],
          required: true,
        },
        aggregatedValue: {
          type: [Number],
          required: true,
        },
        isCalculated: { type: Boolean, default: false },
        expiresAt: {
          type: Date,
          required: true,
          default: function () {
            // Set the expiration date to 7 days from now
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
          },
          index: { expireAfterSeconds: 0 },
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
