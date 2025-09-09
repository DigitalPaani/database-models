import mongoose, { Schema, Document, Types } from "mongoose";

interface IAnomalyRecord extends Document {
  anomalyDetailsId: Types.ObjectId;
  startTime: number;
  endTime: number;
  durationInMinutes: number;
  isIntersected: boolean;

  // common fields for all schemas
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const anomalyRecordsSchema = new Schema<IAnomalyRecord>(
  {
    anomalyDetailsId: {
      type: Schema.Types.ObjectId,
      ref: "anomalyDetails",
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
    isIntersected: {
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
