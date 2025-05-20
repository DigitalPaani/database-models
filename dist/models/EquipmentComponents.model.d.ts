import mongoose, { Document, Types } from "mongoose";
interface IEquipmentComponent extends Document {
    bidirectionalId: Types.ObjectId;
    action: string;
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