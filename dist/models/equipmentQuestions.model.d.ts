import mongoose, { Document } from "mongoose";
interface IEquipmentQuestion extends Document {
    questionId: string;
    nodeType: string;
    question: string;
    type: string | null;
    apiPath: string | null;
    options: (string | {
        label: string;
        value: string;
    })[];
    compulsory: boolean | null;
    required: boolean;
    order: number;
}
declare const EquipmentQuestionsModel: mongoose.Model<IEquipmentQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IEquipmentQuestion> & IEquipmentQuestion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { EquipmentQuestionsModel, IEquipmentQuestion };
//# sourceMappingURL=equipmentQuestions.model.d.ts.map