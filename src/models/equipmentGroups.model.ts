import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IEquipmentGroupEquipment {
  equipmentId: Types.ObjectId;
  selectedSensorId?: Types.ObjectId;
}

interface IEquipmentGroup extends Document {
  name: string;
  description: string;
  equipmentIds: IEquipmentGroupEquipment[];
  assetId: Types.ObjectId;
  dependentSensors: Types.ObjectId[];
  isArchived:boolean;
}

const equipmentGroupSchema = new Schema<IEquipmentGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    equipmentIds: [
      {
        equipmentId: {
          type: Schema.Types.ObjectId,
          ref: "LayoutEquipments",
          required: true,
        },
        selectedSensorId: {
          type: Schema.Types.ObjectId,
          ref: "sensors",
        },
      },
    ],
    assetId: { type: Schema.Types.ObjectId, required: true },
    dependentSensors: [{ type: Schema.Types.ObjectId }],
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const EquipmentGroupModel: Model<IEquipmentGroup> =
  mongoose.model<IEquipmentGroup>(
    "EquipmentGroup",
    equipmentGroupSchema,
    "EquipmentGroups",
  );

export { IEquipmentGroup, IEquipmentGroupEquipment, EquipmentGroupModel };
