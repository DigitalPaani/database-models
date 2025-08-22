import mongoose, { Schema } from "mongoose";

interface IVisualizationPages extends Document {
  name: string;
}

const VisualizationPagesSchema = new Schema(
  {
    name: Schema.Types.String,
    description: Schema.Types.String,
    totalEquipments: Schema.Types.Number,
  },
  { timestamps: true }
);

const VisualizationPagesModel = mongoose.model<IVisualizationPages>(
  "VisualizationPages",
  VisualizationPagesSchema,
  "VisualizationPages"
);

export { VisualizationPagesModel, IVisualizationPages };
