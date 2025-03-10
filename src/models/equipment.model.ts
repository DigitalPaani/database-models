import mongoose, { Document, Schema } from "mongoose";

interface ILayoutEquipment extends Document {
  nodeId: string;
  nodeType: string;
  parentId: string;
}

const LayoutEquipments = new Schema(
  {
    nodeId: String,
    nodeType: String,
    parentId: { type: String, default: null },
  },
  { timestamps: true }
);

const LayoutEquipmentModel = mongoose.model<ILayoutEquipment>(
  "LayoutEquipments",
  LayoutEquipments,
  "LayoutEquipments"
);

export { LayoutEquipmentModel, ILayoutEquipment };
