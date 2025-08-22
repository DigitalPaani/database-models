import mongoose, { Document, Schema, Types } from "mongoose";

import { VISUALIZATION_EQUIPMENT_TYPES_ENUMS } from "../constants/visualization.constants";

interface IRefLayoutEquipment extends Document {
  refId: Types.ObjectId;
  assetId: string;
  nodeType: string;
  itemDetails: string | object;
  equipmentType: string;
  category: string;
  isArchived: boolean;
}

const RefLayoutEquipments = new Schema(
  {
    refId: { type: Schema.Types.ObjectId, ref: "LayoutEquipments" },
    assetId: String,
    nodeType: String,
    category: String,
    equipmentType: {
      type: String,
      enum: VISUALIZATION_EQUIPMENT_TYPES_ENUMS,
    },
    itemDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const RefLayoutEquipmentModel = mongoose.model<IRefLayoutEquipment>(
  "RefLayoutEquipments",
  RefLayoutEquipments,
  "RefLayoutEquipments"
);

export { RefLayoutEquipmentModel, IRefLayoutEquipment };
