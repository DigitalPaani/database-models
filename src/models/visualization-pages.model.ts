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
    name: { type: String, required: true, trim: true },
    workspaceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: { type: String, required: true, trim: true },
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
