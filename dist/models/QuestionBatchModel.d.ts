import mongoose, { Types } from "mongoose";
interface IBatch {
    batchId: number;
    batchName: string;
    batchOrder: number;
}
declare const BatchSchemaModel: mongoose.Model<IBatch, {}, {}, {}, mongoose.Document<unknown, {}, IBatch> & IBatch & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { IBatch, BatchSchemaModel };
//# sourceMappingURL=QuestionBatchModel.d.ts.map