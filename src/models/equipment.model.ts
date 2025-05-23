import mongoose, { Document, Schema } from "mongoose";


import {
  VISUALIZATION_EQUIPMENT_TYPES_ENUMS
} from '../constants/visualization.constants';

interface ILayoutEquipment extends Document {
  refId: string;
  assetId: string;
  nodeType: string;
  itemDetails: string | object;
  equipmentType:string;
  category:string;
  isArchived:boolean;
}

const LayoutEquipments = new Schema(
  {
    refId: String,
    assetId: String,
    nodeType: String,
    category:String,
    equipmentType:{
      type: String,
      enum: VISUALIZATION_EQUIPMENT_TYPES_ENUMS
    },
    itemDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isArchived:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const LayoutEquipmentModel = mongoose.model<ILayoutEquipment>(
  "LayoutEquipments",
  LayoutEquipments,
  "LayoutEquipments"
);

export { LayoutEquipmentModel, ILayoutEquipment };
