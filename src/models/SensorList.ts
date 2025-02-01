import mongoose, { Schema, Document } from "mongoose";

interface ISensor extends Document {
  sensorCompany: string;
  sensorModelNumber: string;
  granularity: string[];
  purpose: string[];
  inputType: ("Modbus" | "Analog" | "Digital")[];
  tags: string[];
}

const SensorSchema = new Schema<ISensor>(
  {
    sensorCompany: { type: String, required: true },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true }, // ["1 Minute", "1 Millisecond", "1 Hour"]
    purpose: { type: [String], required: true }, // ["pH", "BOD", "COD", "Turbidity"]
    inputType: {
      type: [String],
      enum: ["Modbus", "Analog", "Digital"], // Restricts values to these three options
      required: true,
    },
    tags: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

const SensorModel = mongoose.model<ISensor>("SensorList", SensorSchema,'SensorLists');

export {SensorModel,ISensor}