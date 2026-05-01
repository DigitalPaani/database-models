import type { Document, Model, Types } from 'mongoose';
interface IEquipmentGroup extends Document {
    name: string;
    description: string;
    equipmentIds: Types.ObjectId[];
    assetId: Types.ObjectId;
}
declare const EquipmentGroupModel: Model<IEquipmentGroup>;
export { IEquipmentGroup, EquipmentGroupModel };
//# sourceMappingURL=equipmentGroups.model.d.ts.map