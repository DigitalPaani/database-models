import mongoose, { Document, Types } from "mongoose";
interface IEquipmentComponent extends Document {
    bidirectionalLogId: Types.ObjectId;
    scheduledBidirectionalLogId?: Types.ObjectId;
    triggerId: Types.ObjectId;
    controlValue: string;
    softwareBypassValue?: string;
    triggerTime: number;
    isTriggered: boolean;
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
//# sourceMappingURL=equipment-components.model.d.ts.map