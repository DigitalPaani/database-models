import type { Document, Model, Types } from "mongoose";
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
    isArchived: boolean;
}
declare const EquipmentGroupModel: Model<IEquipmentGroup>;
export { IEquipmentGroup, IEquipmentGroupEquipment, EquipmentGroupModel };
//# sourceMappingURL=equipmentGroups.model.d.ts.map