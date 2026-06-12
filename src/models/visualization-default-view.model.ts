import mongoose, { Schema, Types } from "mongoose";

interface IVisualizationDefaultView extends Document {
  workspaceId: Types.ObjectId;
  equipmentId: Types.ObjectId;
  pageId: Types.ObjectId;
  isDefault: boolean;
}

const VisualizationDefaultViewSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: "Workspace" },
    equipmentId: { type: Schema.Types.ObjectId, required: false, ref: "Equipment" },
    pageId: { type: Schema.Types.ObjectId, required: false, ref: "VisualizationPages" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Only one record per page
VisualizationDefaultViewSchema.index(
  {
    workspaceId: 1,
    equipmentId: 1,
    pageId: 1,
  },
  {
    unique: true,
  },
);

// Only one default per workspace
VisualizationDefaultViewSchema.index(
  {
    workspaceId: 1,
    isDefault: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDefault: true,
    },
  },
);

const VisualizationDefaultViewModel = mongoose.model<IVisualizationDefaultView>(
  "VisualizationDefaultView",
  VisualizationDefaultViewSchema,
  "VisualizationDefaultViews",
);

export { VisualizationDefaultViewModel, IVisualizationDefaultView };
