import mongoose, { Schema, Types, type Document, type Model } from "mongoose";

interface IPlantSensorMapping extends Document {
  plantId: Types.ObjectId;
  mappings: Record<string, string[]>;
}

const plantSensorMappingSchema = new Schema<IPlantSensorMapping>(
  {
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
      unique: true,
      index: true,
    },
    mappings: {
      type: Map,
      of: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PlantSensorMappingModel: Model<IPlantSensorMapping> =
  mongoose.model<IPlantSensorMapping>(
    "plantSensorMappings",
    plantSensorMappingSchema,
    "plantSensorMappings",
  );

export { PlantSensorMappingModel, IPlantSensorMapping };
