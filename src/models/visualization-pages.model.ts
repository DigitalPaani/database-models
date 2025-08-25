import mongoose, { Schema, Types } from "mongoose";

interface IVisualizationPages extends Document {
  name: string;
  workspaceId: Types.ObjectId;
  description: string;
  totalEquipments: string;
  isArchived: string;
}

const VisualizationPagesSchema = new Schema(
  {
    name: Schema.Types.String,
    workspaceId: Schema.Types.ObjectId,
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
