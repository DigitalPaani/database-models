import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { STATES } from "../constants/bio-health-tracker.constants";

interface IFlocImage extends Document {
  sensorId?: Types.ObjectId;
  sampleId?: Types.ObjectId;
  fullImageUrl?: string;
  thumbnailUrl?: string;
  state: string;
  timestamp?: Date;
  regionOfInterestCoordinates?: number[][];
}

const flocImageSchema = new Schema<IFlocImage>(
  {
    sensorId: { type: Types.ObjectId, ref: "sensors" },
    sampleId: { type: Types.ObjectId, ref: "FlocSamples" },
    fullImageUrl: { type: String },
    thumbnailUrl: { type: String },
    timestamp: { type: Date, default: Date.now },
    state: {
      type: String,
      enum: STATES,
      required: true,
    },
    regionOfInterestCoordinates: { type: [[Number]], required: true },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const FlocImageModel: Model<IFlocImage> = mongoose.model<IFlocImage>(
  "flocimages",
  flocImageSchema,
  "flocimages"
);
export { FlocImageModel, IFlocImage };
