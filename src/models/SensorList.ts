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
  templateTags?: ITemplateTag[];
}

export interface ITemplateTag {
  tag: string;
  threshold: {
    validMin: number;
    validMax: number;
    cautionMin?: number;
    cautionMax?: number;
    safeMin: number;
    safeMax: number;
    showCautionZone: boolean;
    isThresholdConfigured: boolean;
  };
}
const TemplateTagSchema = new Schema<ITemplateTag>(
  {
    tag: {
      type: String,
      required: true,
    },
    threshold: {
      validMin: { type: Number, required: true },
      validMax: { type: Number, required: true },

      cautionMin: { type: Number, required: false },
      cautionMax: { type: Number, required: false },

      safeMin: { type: Number, required: true },
      safeMax: { type: Number, required: true },

      showCautionZone: { type: Boolean, required: true },
      isThresholdConfigured: { type: Boolean, required: true }
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
    templateTags: {
      type: [TemplateTagSchema],
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
