import mongoose, { Schema, Document } from "mongoose";

export interface ISensorCounterState extends Document {
  sensorId: string;
  stuckValues: number[];
  oorCount: number;
  inRangeCount: number;
  oorEpisodeActive: boolean;
  wasLastValueOOR: boolean;
  oorTripCount: number;
  oorTripWindowStart?: number;
  lastReturnToInRangeTime?: number;
  updatedAt?: Date;
}

const SensorCounterStateSchema = new Schema<ISensorCounterState>(
  {
    sensorId: { type: String, required: true, unique: true, index: true },
    stuckValues: { type: [Number], required: true, default: [] },
    oorCount: { type: Number, required: true, default: 0 },
    inRangeCount: { type: Number, required: true, default: 0 },
    oorEpisodeActive: { type: Boolean, required: true, default: false },
    wasLastValueOOR: { type: Boolean, required: true, default: false },
    oorTripCount: { type: Number, required: true, default: 0 },
    oorTripWindowStart: { type: Number },
    lastReturnToInRangeTime: { type: Number },
  },
  { timestamps: true }
);

export const SensorCounterStateModel = mongoose.model<ISensorCounterState>(
  "sensorCounterState",
  SensorCounterStateSchema,
  "sensorCounterState"
);
