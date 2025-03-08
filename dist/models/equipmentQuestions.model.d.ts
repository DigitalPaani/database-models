import mongoose, { Document } from "mongoose";
interface IEquipmentQuestion extends Document {
    nodeType: string;
    question: string;
    type: string | null;
    options: [string];
    questionType: string;
    order: number;
}
declare const EquipmentQuestionsModel: mongoose.Model<IEquipmentQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentQuestion> & IEquipmentQuestion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { EquipmentQuestionsModel, IEquipmentQuestion };
//# sourceMappingURL=equipmentQuestions.model.d.ts.map