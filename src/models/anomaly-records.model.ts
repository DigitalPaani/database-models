import mongoose, { Schema, Document, Types } from "mongoose";

interface IAnomalyRecord extends Document {
  sensorId: Types.ObjectId;
  startDate: number;
  endDate: number;
  values: [number];
  formulaId: Types.ObjectId;
  isDuplicate: boolean;
  // common fields for all schemas
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const anomalyRecordsSchema = new Schema<IAnomalyRecord>(
  {
    sensorId: {
      type: Schema.Types.ObjectId,
      ref: "sensors",
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    values: {
      type: [Number],
      required: true,
    },
    formulaId: {
      type: Schema.Types.ObjectId,
      ref: "formulas",
      required: true,
    },
    isDuplicate: {
      type: Boolean,
      default: false,
      required: true,
    },

    // common field for all schema
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const AnomalyRecordModel = mongoose.model<IAnomalyRecord>(
  "anomalyRecords",
  anomalyRecordsSchema,
  "anomalyRecords"
);

export { AnomalyRecordModel, IAnomalyRecord };
