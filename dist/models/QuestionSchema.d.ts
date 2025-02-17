import mongoose from "mongoose";
interface IQuestion extends Document {
    _id?: string;
    question: string;
    tag: string;
    conditionalQuestionId: number;
    conditionalAnswer: [string];
    type: "text" | "radio" | "checkbox" | "dropdown" | "date";
    options?: string[];
    required: boolean;
    order: number;
    batchId: number;
    plantType: string;
}
declare const QuestionSchemaModel: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion> & IQuestion & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { QuestionSchemaModel, IQuestion };
//# sourceMappingURL=QuestionSchema.d.ts.map