import mongoose, { Schema } from "mongoose";

interface ISize {
  height: number;
  width: number;
}

interface ITargetAttributes {
  size: ISize;
}

interface ILayoutItem extends Document {
  type: string;
  size: ISize;
  name: string;
  targetAttributes: ITargetAttributes;
  family: string;
}

const LayoutItemsSchema = new Schema<ILayoutItem>(
  {
    type: { type: String, required: true }, 
    // TODO: Add ABBREVIATION
    size: {
      height: { type: Number, required: true },
      width: { type: Number, required: true },
    },
    name: { type: String, required: true },
    targetAttributes: {
      size: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    },
    family: { type: String, required: true }, // TODO: ENUM - Asset, Equipment, Sensors
  },
  { timestamps: true }
);

const LayoutItemsModel = mongoose.model<ILayoutItem>(
  "LayoutItems",
  LayoutItemsSchema,
  "LayoutItems"
);

export { LayoutItemsModel, ILayoutItem };
