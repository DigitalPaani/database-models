import mongoose, { Document, Schema } from "mongoose";

interface ILayoutEquipment extends Document {
  refId: string;
  assetId: string;
  nodeType: string;
  itemDetails: string;
}

const LayoutEquipments = new Schema(
  {
    refId: String,
    assetId: String,
    nodeType: String,
    itemDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const LayoutEquipmentModel = mongoose.model<ILayoutEquipment>(
  "LayoutEquipments",
  LayoutEquipments,
  "LayoutEquipments"
);

export { LayoutEquipmentModel, ILayoutEquipment };
