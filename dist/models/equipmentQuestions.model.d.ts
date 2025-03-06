import mongoose from "mongoose";
interface IEquipmentQuestion extends Document {
    equipmentType: string;
    question: string;
    type: string | null;
}
declare const EquipmentQuestionsModel: mongoose.Model<IEquipmentQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentQuestion> & IEquipmentQuestion & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { EquipmentQuestionsModel, IEquipmentQuestion };
//# sourceMappingURL=equipmentQuestions.model.d.ts.map