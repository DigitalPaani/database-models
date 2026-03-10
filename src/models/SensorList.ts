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
  tagsList?:ITagsList[]
}

export interface ITagsList {
  tag: string;
  thresholds: {
    validRangeMin: number;
    validRangeMax: number;
    cautionRangeMin: number;
    cautionRangeMax: number;
    safeRangeMin: number;
    safeRangeMax: number;
  };
}
const TagsListSchema = new Schema<ITagsList>(
  {
    tag: {
      type: String,
      required: true,
    },
    thresholds: {
      validRangeMin: { type: Number, required: true },
      validRangeMax: { type: Number, required: true },

      cautionRangeMin: { type: Number, required: true },
      cautionRangeMax: { type: Number, required: true },

      safeRangeMin: { type: Number, required: true },
      safeRangeMax: { type: Number, required: true },
    },
  },
  { _id: false },
);

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
    purpose: { type: [String], enum: SENSOR_PURPOSE_TAGS.map((tag) => tag.key) },
    inputType: {
      type: [String],
      enum: sensorInputType, // Restricts values to these three options
    },
    tags: { type: [String], default: [] },
    tagsList: {
      type: [TagsListSchema],
      default: {},
      required: false
    },
  },
  { timestamps: true }
);

const SensorModel = mongoose.model<ISensor>(
  "SensorList",
  SensorSchema,
  "SensorLists"
);

export { SensorModel, ISensor };
