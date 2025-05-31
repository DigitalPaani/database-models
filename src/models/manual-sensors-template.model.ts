import mongoose, { Schema, Document } from "mongoose";
import { manualCategoryList } from "../constants/manualSensorsCategoryConst";

const manualCategory = manualCategoryList.map((category) => category.key);
interface IManualSensors extends Document {
  sensorName: string;
  tag: string;
  category: string;
  isArchived:boolean;
  type: string;
}

const ManualSensorSchema = new Schema<IManualSensors>(
  {
    sensorName: { type: String, required: true, trim: true},
    category: { type: String, required: true, enum: manualCategory },
    tag: { type: String},
    isArchived: {type: Boolean, default: false},
    type: {type: String, required: true},
  },
  { timestamps: true }
);

const ManualSensorModel = mongoose.model<IManualSensors>(
  "ManualSensorTemplate",
  ManualSensorSchema,
  "ManualSensorTemplates"
);

export { ManualSensorModel, IManualSensors };
