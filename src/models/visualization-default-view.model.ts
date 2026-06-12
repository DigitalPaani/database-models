import mongoose, { Schema, Types } from "mongoose";

interface IVisualizationDefaultView extends Document {
  equipmentId: Types.ObjectId;
  pageId: Types.ObjectId;
  isDefault: boolean;
}

const VisualizationDefaultViewSchema = new Schema(
  {
    equipmentId: { type: Schema.Types.ObjectId, required: false, ref: "Equipment" },
    pageId: { type: Schema.Types.ObjectId, required: false, ref: "VisualizationPages" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const VisualizationDefaultViewModel = mongoose.model<IVisualizationDefaultView>(
  "VisualizationDefaultView",
  VisualizationDefaultViewSchema,
  "VisualizationDefaultViews",
);

export { VisualizationDefaultViewModel, IVisualizationDefaultView };
