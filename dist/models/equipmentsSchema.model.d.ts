import mongoose from "mongoose";
interface IEquipment extends Document {
    equipmentId: string;
    equipmentName: object;
    xlineHref: string;
}
declare const EquipmentsModel: mongoose.Model<IEquipment, {}, {}, {}, mongoose.Document<unknown, {}, IEquipment> & IEquipment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { EquipmentsModel, IEquipment };
//# sourceMappingURL=equipmentsSchema.model.d.ts.map