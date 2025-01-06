import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

export interface ISensor {
  _id?: Types.ObjectId;
  sensorTag: string;
  sensorNickName: string;
  plantId?: Types.ObjectId;
  storeId?: Types.ObjectId;
  dataType: string;
  sensorType: string;
  dataInputType: string;
  plcId?: Types.ObjectId;
  isEnabled: boolean;
  sensorTypeAbr?: string;
  oldSensorTag?: string;
  sensorOffSet?: Types.ObjectId;
}

const sensor = new Schema(
  {
    sensorTag: String,
    sensorNickName: String,
    plantId: mongoose.Schema.Types.ObjectId,
    workspaceId: mongoose.Schema.Types.ObjectId,
    dataType: String,
    sensorType: String,
    dataInputType: String,
    plcId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isEnabled: Boolean,
    sensorTypeAbr: {
      type: String,
      required: false,
    },
    storeId: {
      type: Types.ObjectId,
      required: false,
    },
    oldSensorTag: String,
    sensorOffSet: {
      type: Types.ObjectId,
      ref: "sensorOffSet",
    },
  },
  {
    timestamps: true,
  }
);

const SensorModel = mongoose.model<ISensor & mongoose.Document>(
  "sensors",
  sensor
);
export default SensorModel;
