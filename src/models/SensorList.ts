import mongoose, { Schema, Document, Types } from "mongoose";
import { sensorPurposeTags, sensorInputType } from "../constants/sensorConst";

interface ISensor extends Document {
  sensorName: string;
  sensorCompanyId: Types.ObjectId;
  sensorModelNumber: string;
  granularity: string[];
  purpose: string[];
  inputType: string[];
  tags: string[];
}

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
    purpose: { type: [String], enum: sensorPurposeTags },
    inputType: {
      type: [String],
      enum: sensorInputType, // Restricts values to these three options
    },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const SensorModel = mongoose.model<ISensor>(
  "SensorList",
  SensorSchema,
  "SensorLists"
);

export { SensorModel, ISensor };
