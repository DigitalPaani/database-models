import type { Document, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IPlantHealth extends Document {
  plantId: Types.ObjectId;
  lastContactedTime: number;
  internet: boolean;
}

const PlantHealthSchema = new Schema<IPlantHealth>(
  {
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
      unique: true,
      index: true,
    },
    lastContactedTime: { type: Number },
    internet: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const PlantHealthModel = mongoose.model<IPlantHealth>(
  "PlantHealth",
  PlantHealthSchema,
  "PlantHealth"
);
