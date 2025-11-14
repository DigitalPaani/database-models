import mongoose, { Types } from "mongoose";
interface INewPathSchema extends Document {
    graphId: Types.ObjectId;
    from: string;
    to: string;
    path: string[];
    index: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const NewLayoutPathModel: mongoose.Model<INewPathSchema, {}, {}, {}, mongoose.Document<unknown, {}, INewPathSchema> & INewPathSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { NewLayoutPathModel, INewPathSchema };
//# sourceMappingURL=newGraphConnections.model.d.ts.map