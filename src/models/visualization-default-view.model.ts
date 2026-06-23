import mongoose, { Schema, Types } from "mongoose";

interface IVisualizationDefaultView extends Document {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  defaultViewLink: string;
}

const VisualizationDefaultViewSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, required: true, ref: "Workspace" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    defaultViewLink: { type: String, required: true },
  },
  { timestamps: true },
);

// Only one record per page
VisualizationDefaultViewSchema.index(
  {
    workspaceId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

const VisualizationDefaultViewModel = mongoose.model<IVisualizationDefaultView>(
  "VisualizationDefaultView",
  VisualizationDefaultViewSchema,
  "VisualizationDefaultViews",
);

export { VisualizationDefaultViewModel, IVisualizationDefaultView };
