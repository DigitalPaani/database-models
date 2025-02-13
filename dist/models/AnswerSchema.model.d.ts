import mongoose from "mongoose";
interface Answer {
    _id?: string;
    questionId: string;
    assetId: string;
    answer: string | number | boolean | null;
}
declare const AnswerSchemaModel: mongoose.Model<Answer, {}, {}, {}, mongoose.Document<unknown, {}, Answer> & Answer & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { Answer, AnswerSchemaModel };
//# sourceMappingURL=AnswerSchema.model.d.ts.map