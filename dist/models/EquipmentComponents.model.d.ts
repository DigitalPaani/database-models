import mongoose, { Document, Types } from "mongoose";
interface IEquipmentComponent extends Document {
    bidirectionalId: Types.ObjectId;
    controlValue: string;
    relativeTimeDetails?: {
        unit: string;
        value: number;
        timeInMinutes: number;
    };
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const EquipmentComponentModel: mongoose.Model<IEquipmentComponent, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentComponent> & IEquipmentComponent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { EquipmentComponentModel, IEquipmentComponent };
//# sourceMappingURL=EquipmentComponents.model.d.ts.map