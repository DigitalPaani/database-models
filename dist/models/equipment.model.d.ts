import mongoose, { Document } from "mongoose";
interface ILayoutEquipment extends Document {
    refId: string;
    assetId: string;
    nodeType: string;
    itemDetails: string;
    category: string;
}
declare const LayoutEquipmentModel: mongoose.Model<ILayoutEquipment, {}, {}, {}, mongoose.Document<unknown, {}, ILayoutEquipment> & ILayoutEquipment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { LayoutEquipmentModel, ILayoutEquipment };
//# sourceMappingURL=equipment.model.d.ts.map