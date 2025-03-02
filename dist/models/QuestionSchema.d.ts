import mongoose from "mongoose";
interface IQuestion extends Document {
    _id?: string;
    question: string;
    tag: string;
    conditionalQuestionId: [number] | null;
    conditionalAnswer: string[][];
    questionId: number;
    type: "text" | "radio" | "checkbox" | "dropdown" | "date";
    options?: string[];
    required: boolean;
    order: number;
    batchId: number;
    dummy: boolean;
    validation: string[];
    analyticalValue: boolean | null;
    name: string;
    defaultValue: string | null;
}
declare const QuestionSchemaModel: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion> & IQuestion & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { QuestionSchemaModel, IQuestion };
//# sourceMappingURL=QuestionSchema.d.ts.map