import mongoose from "mongoose";
interface IQuestion extends Document {
    _id?: string;
    text: string;
    key: string;
    type: "text" | "radio" | "checkbox" | "dropdown" | "date";
    options?: string[];
    required: boolean;
    order: number;
}
declare const QuestionSchemaModel: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion> & IQuestion & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { QuestionSchemaModel, IQuestion };
//# sourceMappingURL=QuestionSchema.d.ts.map