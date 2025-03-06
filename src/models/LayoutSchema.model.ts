import mongoose, { Schema } from "mongoose";

interface ILayout extends Document {
  assetId?: string;
  layout: object;
}

const LayoutSchema = new Schema(
  {
    assetId: Schema.Types.ObjectId,
    layout: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const LayoutModel = mongoose.model<ILayout>("Layouts", LayoutSchema, "Layouts");

export { LayoutModel, ILayout };
