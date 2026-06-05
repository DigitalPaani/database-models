import type { Document, Model, Types } from "mongoose";
interface IUnitProcessGroup extends Document {
    name: string;
    description?: string;
    equipments: Types.ObjectId[];
    assetId: Types.ObjectId;
    setPoints: Types.ObjectId[];
    isArchived: boolean;
}
declare const UnitProcessGroupModel: Model<IUnitProcessGroup>;
export { UnitProcessGroupModel, IUnitProcessGroup };
//# sourceMappingURL=unitGroups.model.d.ts.map