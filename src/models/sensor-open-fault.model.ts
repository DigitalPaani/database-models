import mongoose, { Schema, Document } from "mongoose";

export interface ISensorOpenFault extends Document {
  sensorId: string;
  eventId: string;
  plantId: string;
  detectedAt: number;
  confidence: "MEDIUM" | "HIGH";
  faultType: "STUCK" | "OUT_OF_RANGE" | "DATA_BREAK";
  subState: "NONE" | "FLUTTERING" | "PERSISTENT";
  frozenValue?: number;
  updatedAt?: Date;
}

const SensorOpenFaultSchema = new Schema<ISensorOpenFault>(
  {
    sensorId: { type: String, required: true, index: true },
    eventId: { type: String, required: true },
    plantId: { type: String, required: true },
    detectedAt: { type: Number, required: true },
    confidence: { type: String, enum: ["MEDIUM", "HIGH"], required: true },
    faultType: {
      type: String,
      enum: ["STUCK", "OUT_OF_RANGE", "DATA_BREAK"],
      required: true,
    },
    subState: {
      type: String,
      enum: ["NONE", "FLUTTERING", "PERSISTENT"],
      required: true,
    },
    frozenValue: { type: Number },
  },
  { timestamps: true }
);

// Unique constraint matching the Redis key pattern: sensorId + faultType + subState
SensorOpenFaultSchema.index(
  { sensorId: 1, faultType: 1, subState: 1 },
  { unique: true }
);

export const SensorOpenFaultModel = mongoose.model<ISensorOpenFault>(
  "sensorOpenFault",
  SensorOpenFaultSchema,
  "sensorOpenFault"
);
