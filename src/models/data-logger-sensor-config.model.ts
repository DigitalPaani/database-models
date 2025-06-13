import mongoose, { Schema, Types } from "mongoose";
import { SENSOR_TYPE } from "../constants/data-logger.constant";

interface IDLSensorConfig {
  dataLoggerId: Types.ObjectId;
  sensorId: Types.ObjectId;
  start: number;
  end: number;
  type: string; // Extend types as needed
  wordOrder: string;
  function?: string;
  scaledRequired?: boolean;
  scalingFactor?: number;
  totalizerRequired?: boolean;
  totalizerTag?: string;
  modbusMisfireTotalizer?: boolean;
  bitIndex?: number;
}

function isValidFunctionExpression(expr: string): boolean {
  // Basic pattern: only allows simple math with x
  return /^[x\d\s\+\-\*\/\.\(\)]+$/.test(expr.trim());
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
    start: { type: Number },
    end: { type: Number },
    type: { type: String, enum: Object.values(SENSOR_TYPE) },
    wordOrder: {
      type: String,
    },
    function: {
      type: String,
      validate: {
        validator: isValidFunctionExpression,
        message: (props: any) =>
          `"${props.value}" is not a valid function expression.`,
      },
    },
    scaledRequired: { type: Boolean },
    scalingFactor: { type: Number },
    totalizerRequired: { type: Boolean },
    totalizerTag: { type: String },
    modbusMisfireTotalizer: { type: Boolean },
    bitIndex: { type: Number, required: false },
  },
  { _id: false }
);

const DLSensorConfigModel = mongoose.model<IDLSensorConfig>(
  "dataLoggerSensorConfig",
  dataLoggerSensorConfigSchema,
  "dataLoggerSensorConfig"
);

export { DLSensorConfigModel, IDLSensorConfig };
