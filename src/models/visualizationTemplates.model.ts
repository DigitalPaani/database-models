import mongoose, { Schema } from "mongoose";

interface IVisualizationTemplatesLayout extends Document {
  nodeId: string;
  layout: object;
  version: number;
}

const VisualizationTemplatesSchema = new Schema(
  {
    nodeId: Schema.Types.ObjectId,
    layout: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const VisualizationTemplatesModel = mongoose.model<IVisualizationTemplatesLayout>("VisualizationTemplates", VisualizationTemplatesSchema, "Layouts");

export { VisualizationTemplatesModel, IVisualizationTemplatesLayout };
