import mongoose, { Schema } from "mongoose";

interface ISize {
  height: number;
  width: number;
}

interface ITargetAttributes {
  size: ISize;
}

interface ISidebarLayoutItem extends Document {
  type: string;
  abbr: string;
  size: ISize;
  name: string;
  targetAttributes: ITargetAttributes;
  family: string;
  category: string;
}

const SidebarLayoutItemsSchema = new Schema<ISidebarLayoutItem>(
  {
    type: { type: String, required: true },
    abbr: { type: String, required: true },
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
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const SidebarLayoutItemsModel = mongoose.model<ISidebarLayoutItem>(
  "SidebarLayoutItems",
  SidebarLayoutItemsSchema,
  "SidebarLayoutItems"
);

export { SidebarLayoutItemsModel, ISidebarLayoutItem };
