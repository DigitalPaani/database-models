import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { FLOC_STATES } from "../constants/bio-health-tracker.constants";

interface IFlocImage extends Document {
  sensorId?: Types.ObjectId;
  sampleId?: string;
  fullImageUrl?: string;
  thumbnailUrl?: string | null;
  state: string;
  timestamp?: Date;
  regionOfInterestCoordinates?: number[][] | null;
}

const flocImageSchema = new Schema<IFlocImage>(
  {
    sensorId: { type: Types.ObjectId, ref: "sensors", required: true },
    sampleId: { type: String, required: true },
    fullImageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
    state: {
      type: String,
      enum: FLOC_STATES,
      required: true,
    },
    regionOfInterestCoordinates: { type: [[Number]], required: false },
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
