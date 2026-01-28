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
    version: {
      type: Schema.Types.Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const VisualizationTemplatesModel =
  mongoose.model<IVisualizationTemplatesLayout>(
    "VisualizationTemplates",
    VisualizationTemplatesSchema,
    "VisualizationTemplates",
  );

export { VisualizationTemplatesModel, IVisualizationTemplatesLayout };
