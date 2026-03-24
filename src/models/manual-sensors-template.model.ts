import mongoose, { Schema, Document } from "mongoose";
import { manualCategoryList } from "../constants/manualSensorsCategoryConst";

const manualCategory = manualCategoryList.map((category) => category.key);
export interface IManualTemplateTag {
  tag: string;
  threshold: {
    validMin: number;
    validMax: number;
    cautionMin?: number;
    cautionMax?: number;
    safeMin: number;
    safeMax: number;
    showCautionZone?: boolean;
  };
  isThresholdConfigured?: boolean;
}
interface IManualSensors extends Document {
  sensorName: string;
  tag: string;
  category: string;
  isArchived: boolean;
  type: string;
  templateTag: IManualTemplateTag
}

const ManualTemplateTagSchema = new Schema<IManualTemplateTag>(
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
      showCautionZone: { type: Boolean, required: false },
    },
    isThresholdConfigured: { type: Boolean, required: false, default: false },
  },
  { _id: false },
);

const ManualSensorSchema = new Schema<IManualSensors>(
  {
    sensorName: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: manualCategory },
    tag: { type: String },
    isArchived: { type: Boolean, default: false },
    type: { type: String, required: true },
    templateTag: {
      type: ManualTemplateTagSchema,
      default: {},
      required: false,
    },
  },
  { timestamps: true },
);

const ManualSensorModel = mongoose.model<IManualSensors>(
  "ManualSensorTemplate",
  ManualSensorSchema,
  "ManualSensorTemplates"
);

export { ManualSensorModel, IManualSensors };
