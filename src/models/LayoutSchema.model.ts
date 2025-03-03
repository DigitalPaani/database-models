import mongoose, { Schema } from "mongoose";

interface ILayout extends Document {
  id?: string;
  layout: object;
}

const LayoutSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    layout: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const LayoutModel = mongoose.model<ILayout>("Layouts", LayoutSchema, "Layouts");

export { LayoutModel, ILayout };
