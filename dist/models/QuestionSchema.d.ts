import mongoose from "mongoose";
interface Question extends Document {
    _id?: string;
    text: string;
    key: string;
    type: "text" | "radio" | "checkbox" | "dropdown" | "date";
    options?: string[];
    required: boolean;
    order: number;
}
declare const QuestionSchemaModel: mongoose.Model<Question, {}, {}, {}, mongoose.Document<unknown, {}, Question> & Question & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { QuestionSchemaModel, Question };
//# sourceMappingURL=QuestionSchema.d.ts.map