import mongoose, { Document, Schema } from "mongoose";


import {
  VISUALIZATION_EQUIPMENT_TYPES_ENUMS
} from '../constants/visualization.constants';
import { Types } from "mongoose";

interface ILayoutEquipment extends Document {
  parentId: Types.ObjectId;
  nodeType: string;
  itemDetails: string | object;
  equipmentType:string;
  category:string;
  isArchived:boolean;
  nodeId:Types.ObjectId;
}

const LayoutEquipments = new Schema(
  {
    parentId: Schema.Types.ObjectId,
    nodeId:Schema.Types.ObjectId,
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
