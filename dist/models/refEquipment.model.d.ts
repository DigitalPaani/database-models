import mongoose, { Document, Types } from "mongoose";
interface IRefLayoutEquipment extends Document {
    refId: Types.ObjectId;
    assetId: string;
    nodeType: string;
    itemDetails: string | object;
    equipmentType: string;
    category: string;
    isArchived: boolean;
}
declare const RefLayoutEquipmentModel: mongoose.Model<IRefLayoutEquipment, {}, {}, {}, mongoose.Document<unknown, {}, IRefLayoutEquipment> & IRefLayoutEquipment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { RefLayoutEquipmentModel, IRefLayoutEquipment };
//# sourceMappingURL=refEquipment.model.d.ts.map