import type { Document, Model, Types } from "mongoose";
interface IUnitProcessGroupEquipment {
    _id: Types.ObjectId;
    dependentSensors: Types.ObjectId[];
}
interface IUnitProcessGroup extends Document {
    name: string;
    description?: string;
    equipments: IUnitProcessGroupEquipment[];
    assetId: Types.ObjectId;
    setPoints: Types.ObjectId[];
    isArchived: boolean;
}
declare const UnitProcessGroupModel: Model<IUnitProcessGroup>;
export { UnitProcessGroupModel, IUnitProcessGroup, IUnitProcessGroupEquipment };
//# sourceMappingURL=unitGroups.model.d.ts.map