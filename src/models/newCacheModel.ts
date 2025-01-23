import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { FormulaCommonTypes } from "../types/formulaTypes";

interface INewCache extends Document {
  sensorTag: string;
  plantId:Types.ObjectId;
  formulaId:Types.ObjectId;
  sensorSettingId: Types.ObjectId;
  details: FormulaCommonTypes.SensorSetting;
  firstDataDate:number|null;
  nextCalculationTime:number|null;
  rawValue:[number|null];
  values: Array<{
    timestamp: number;
    aggregatedValue: number[];
    isCalculated: boolean;
  }>;
}

const newCacheSchema = new Schema<INewCache>(
  {
    sensorTag: {
      type: String,
      required: true,
      trim: true,
    },
    plantId:{
      type:Schema.Types.ObjectId,
      require:true
    },
    formulaId:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "formulas"      
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
    firstDataDate:{
      type:Number,
      require:true,
      default:null
    },
    rawValue: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    nextCalculationTime:{
      type:Number,
      required:true
    },
    values: [
      {
        timestamp: {
          type: Number, // Assuming epoch is stored as a number
          required: true,
        },
        aggregatedValue: {
          type: [Number],
          required: true,
        },
        isCalculated: { type: Boolean, default: false },
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
