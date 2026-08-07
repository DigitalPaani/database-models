import mongoose, { Document } from "mongoose";
import { Types } from "mongoose";
interface ILayoutEquipment extends Document {
    parentId: Types.ObjectId;
    nodeType: string;
    itemDetails: string | object;
    equipmentType: string;
    category: string;
    isArchived: boolean;
    nodeId: Types.ObjectId;
}
declare const LayoutEquipmentModel: mongoose.Model<ILayoutEquipment, {}, {}, {}, mongoose.Document<unknown, {}, ILayoutEquipment> & ILayoutEquipment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { LayoutEquipmentModel, ILayoutEquipment };
//# sourceMappingURL=equipment.model.d.ts.map