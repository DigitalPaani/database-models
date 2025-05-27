import mongoose, { Document } from "mongoose";
interface IEquipmentAnswer extends Document {
    assetId: string;
    nodeType: string;
    nodeId: string;
    questionId: string;
    answer: string;
}
declare const EquipmentAnswersModel: mongoose.Model<IEquipmentAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentAnswer> & IEquipmentAnswer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { EquipmentAnswersModel, IEquipmentAnswer };
//# sourceMappingURL=equipmentAnswers.model.d.ts.map