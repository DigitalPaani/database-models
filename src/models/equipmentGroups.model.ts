import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IEquipmentGroup extends Document {
  name: string;
  description: string;
  equipmentIds: Types.ObjectId[];
  assetId: Types.ObjectId;
  dependentSensors: Types.ObjectId[];
}

const equipmentGroupSchema = new Schema<IEquipmentGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    equipmentIds: [{ type: Schema.Types.ObjectId }],
    assetId: { type: Schema.Types.ObjectId, required: true },
    dependentSensors: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const EquipmentGroupModel: Model<IEquipmentGroup> = mongoose.model<IEquipmentGroup>(
  'EquipmentGroup',
  equipmentGroupSchema,
  'EquipmentGroups'
);

export { IEquipmentGroup, EquipmentGroupModel };
