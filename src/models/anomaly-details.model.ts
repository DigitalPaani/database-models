import mongoose, { Schema, Document, Types } from "mongoose";
import anomalyRecordConst from "../constants/anomaly-record-const";

interface IAnomalyDetails extends Document {
  sensorId: Types.ObjectId;
  formulaId: Types.ObjectId;
  configStartTime: number;
  configEndTime: number;
  noise: boolean;
  sensitivity: string;

  // common fields for all schemas
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const anomalyDetailsSchema = new Schema<IAnomalyDetails>(
  {
    sensorId: {
      type: Schema.Types.ObjectId,
      ref: "sensors",
      required: true,
    },
    formulaId: {
      type: Schema.Types.ObjectId,
      ref: "formulas",
      required: true,
    },
    configStartTime: {
      type: Number,
      required: true,
    },
    configEndTime: {
      type: Number,
      required: true,
    },
    noise: {
      type: Boolean,
      default: false,
      required: true,
    },
    sensitivity: {
      type: String,
      enum: Object.values(anomalyRecordConst.ANOMALY_RECORD_SENSITIVITY),
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const AnomalyDetailsModel = mongoose.model<IAnomalyDetails>(
  "anomalyDetails",
  anomalyDetailsSchema,
  "anomalyDetails"
);

export { AnomalyDetailsModel, IAnomalyDetails };
