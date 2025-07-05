import mongoose, { Schema, Types } from "mongoose";
import { SENSOR_TYPE } from "../constants/data-logger.constant";

interface IDLSensorConfig {
  dataLoggerId: Types.ObjectId;
  sensorId: Types.ObjectId;
  sensorType: "analog" | "boolean";
  referenceSensorId?: Types.ObjectId;
  referenceSensorPurpose?: string;
  scalingFactor?: number;
  start?: number;
  end?: number;
  type?: string; // Extend types as needed
  wordOrder?: string;
  function?: string;
  modbusMisfireTotalizer?: boolean;
  bitIndex?: number;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const dataLoggerSensorConfigSchema = new Schema<IDLSensorConfig>(
  {
    dataLoggerId: {
      type: Schema.Types.ObjectId,
      ref: "dataLoggers",
      required: true,
    },
    sensorId: {
      type: Schema.Types.ObjectId,
      ref: "sensors",
      required: true,
    },
    sensorType: { type: String, enum: ["analog", "boolean"], required: true },
    referenceSensorId: {
      type: Schema.Types.ObjectId,
      ref: "sensors",
    },
    referenceSensorPurpose: {
      type: String,
      enum: ["totalizer"],
      trim: true,
    },
    scalingFactor: { type: Number },
    start: { type: Number },
    end: { type: Number },
    type: { type: String, enum: Object.values(SENSOR_TYPE), required: false },
    wordOrder: {
      type: String,
    },
    function: {
      type: String,
      trim: true,
    },
    modbusMisfireTotalizer: { type: Boolean },
    bitIndex: { type: Number },
    version: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

const DLSensorConfigModel = mongoose.model<IDLSensorConfig>(
  "dataLoggerSensorConfig",
  dataLoggerSensorConfigSchema,
  "dataLoggerSensorConfig"
);

export { DLSensorConfigModel, IDLSensorConfig, dataLoggerSensorConfigSchema };
