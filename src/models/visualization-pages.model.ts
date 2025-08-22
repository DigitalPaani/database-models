import mongoose, { Schema } from "mongoose";

interface IVisualizationPages extends Document {
  name: string;
  description: string;
  totalEquipments: string;
  isArchived: string;
}

const VisualizationPagesSchema = new Schema(
  {
    name: Schema.Types.String,
    description: Schema.Types.String,
    totalEquipments: { type: Schema.Types.Number, default: 0 },
    isArchived: { type: Schema.Types.Boolean, default: false },
  },
  { timestamps: true }
);

const VisualizationPagesModel = mongoose.model<IVisualizationPages>(
  "VisualizationPages",
  VisualizationPagesSchema,
  "VisualizationPages"
);

export { VisualizationPagesModel, IVisualizationPages };
