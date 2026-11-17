import mongoose, { Schema, Document, Types } from "mongoose";
import { sensorInputType } from "../constants/sensorConst";

interface ISensorRegistry extends Document {
  sensorName: string;
  sensorCompanyId: Types.ObjectId;
  sensorModelNumber: string;
  granularity: string[];
  purpose: string[];
  inputType: string[];
  purposeTags: string[];
  purposeTemplates?: IPurposeTemplateTag[];
}

export interface IPurposeTemplateTag {
  tag: string;
  threshold: {
    validMin?: number;
    validMax?: number;
    cautionMin?: number;
    cautionMax?: number;
    safeMin?: number;
    safeMax?: number;
    showCautionZone?: boolean;
  };
  isThresholdConfigured?: boolean;
}
export const TemplateTagSchema = new Schema<IPurposeTemplateTag>(
  {
    tag: {
      type: String,
      required: true,
    },
    threshold: {
      validMin: { type: Number, required: false },
      validMax: { type: Number, required: false },
      cautionMin: { type: Number, required: false },
      cautionMax: { type: Number, required: false },
      safeMin: { type: Number, required: false },
      safeMax: { type: Number, required: false },
      showCautionZone: { type: Boolean, required: false },
    },
    isThresholdConfigured: { type: Boolean, required: false, default: false },
  },
  { _id: false },
);

const SensorRegistrySchema = new Schema<ISensorRegistry>(
  {
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "company",
    },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true }, 
    purpose: { type: [String] },
    inputType: {
      type: [String],
      enum: sensorInputType, // Restricts values to these three options
    },
    purposeTags: { type: [String], default: [] },
    purposeTemplates: {
      type: [TemplateTagSchema],
      default: [],
      required: false
    },
  },
  { timestamps: true }
);

const SensorRegistryModel = mongoose.model<ISensorRegistry>(
  "sensorRegistry",
  SensorRegistrySchema,
  "sensorRegistry"
);

export { SensorRegistryModel, ISensorRegistry };
