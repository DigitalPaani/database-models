import mongoose, { Schema } from "mongoose";

interface ILayout extends Document {
  nodeId: string;
  layout: object;
}

const LayoutSchema = new Schema(
  {
    nodeId: Schema.Types.ObjectId,
    layout: mongoose.Schema.Types.Mixed,
    version: {
      type: Schema.Types.Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const LayoutModel = mongoose.model<ILayout>("Layouts", LayoutSchema, "Layouts");

export { LayoutModel, ILayout };
