import mongoose, { Schema, Document, Types } from "mongoose";

interface IEquipmentComponent extends Document {
  equipmentId: Types.ObjectId;
  bidirectionalIdLogId: Types.ObjectId;
  controlValue: string;
  triggerTime: number;
  isTriggered: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const equipmentComponentSchema = new Schema<IEquipmentComponent>(
  {
    equipmentId: {
      type: Schema.Types.ObjectId,
      ref: "LayoutEquipments",
      required: true,
    },
    bidirectionalIdLogId: {
      type: Schema.Types.ObjectId,
      ref: "bidirectionalLogs",
      required: true,
    },
    controlValue: {
      type: String,
      required: true,
    },
    triggerTime: {
      type: Number,
      required: true,
    },
    isTriggered: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const EquipmentComponentModel = mongoose.model<IEquipmentComponent>(
  "equipmentComponents",
  equipmentComponentSchema,
  "equipmentComponents"
);

export { EquipmentComponentModel, IEquipmentComponent };
