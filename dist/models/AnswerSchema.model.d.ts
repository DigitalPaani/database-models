import mongoose from "mongoose";
interface IAnswer {
    _id?: string;
    questionId: string;
    assetId: string;
    answer: string | number | boolean | null;
}
declare const AnswerSchemaModel: mongoose.Model<IAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IAnswer> & IAnswer & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { IAnswer, AnswerSchemaModel };
//# sourceMappingURL=AnswerSchema.model.d.ts.map