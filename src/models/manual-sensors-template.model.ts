import mongoose, { Schema, Document } from "mongoose";
import { manualCategoryList } from "../constants/manualSensorsCategoryConst";

const manualCategory = manualCategoryList.map((category) => category.key);
interface IManualSensors extends Document {
  sensorName: string;
  tags: string;
  category: string;
}

const ManualSensorSchema = new Schema<IManualSensors>(
  {
    sensorName: { type: String, required: true, trim: true},
    category: { type: String, required: true, enum: manualCategory },
    tags: { type: String},
  },
  { timestamps: true }
);

const ManualSensorModel = mongoose.model<IManualSensors>(
  "ManualSensorTemplate",
  ManualSensorSchema,
  "ManualSensorTemplates"
);

export { ManualSensorModel, IManualSensors };
