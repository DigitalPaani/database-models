import mongoose, { Document } from "mongoose";
interface ILayoutEquipment extends Document {
    nodeId: string;
    nodeType: string;
    parentId: string;
}
declare const LayoutEquipmentModel: mongoose.Model<ILayoutEquipment, {}, {}, {}, mongoose.Document<unknown, {}, ILayoutEquipment> & ILayoutEquipment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { LayoutEquipmentModel, ILayoutEquipment };
//# sourceMappingURL=equipment.model.d.ts.map