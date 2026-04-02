import mongoose, { Schema, Document } from "mongoose";
import { manualCategoryList } from "../constants/manualSensorsCategoryConst";
import { ITemplateTag, TemplateTagSchema } from "./SensorList";

const manualCategory = manualCategoryList.map((category) => category.key);

interface IManualSensors extends Document {
  sensorName: string;
  tag: string;
  category: string;
  isArchived: boolean;
  type: string;
  templateTags?: ITemplateTag[]
}

const ManualSensorSchema = new Schema<IManualSensors>(
  {
    sensorName: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: manualCategory },
    tag: { type: String },
    isArchived: { type: Boolean, default: false },
    type: { type: String, required: true },
    templateTags: {
      type: [TemplateTagSchema],
      default: [],
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
