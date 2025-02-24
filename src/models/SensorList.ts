import mongoose, { Schema, Document, Types } from "mongoose";

interface ISensor extends Document {
  sensorName:string;
  sensorCompanyId:Types.ObjectId;
  sensorModelNumber: string;
  granularity: string[];
  purpose: string[];
  inputType: ("Modbus" | "Analog" | "Digital")[];
  tags: string[];
}

const SensorSchema = new Schema<ISensor>(
  {
    sensorName: {type:String,required:true,trim:true},
    sensorCompanyId: {type:Schema.Types.ObjectId,required:true,ref:"company"},
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