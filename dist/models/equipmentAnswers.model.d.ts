import mongoose from "mongoose";
interface IEquipmentAnswer extends Document {
    assetId: string;
    equipmentType: string;
    answer: string;
}
declare const EquipmentAnswersModel: mongoose.Model<IEquipmentAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentAnswer> & IEquipmentAnswer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { EquipmentAnswersModel, IEquipmentAnswer };
//# sourceMappingURL=equipmentAnswers.model.d.ts.map