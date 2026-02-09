import mongoose, { Schema } from "mongoose";

interface IVisualizationTemplatesLayout extends Document {
  name: string;
  description:string;
  isArchived: string;
}

const VisualizationTemplatesSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description:{ type: String, required: true, trim: true },
    isArchived: { type: Schema.Types.Boolean, default: false },
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
