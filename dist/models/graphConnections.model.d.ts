import mongoose, { Types } from "mongoose";
interface IPathSchema extends Document {
    graphId: Types.ObjectId;
    from: string;
    to: string;
    path: string[];
    index: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const LayoutPathModel: mongoose.Model<IPathSchema, {}, {}, {}, mongoose.Document<unknown, {}, IPathSchema> & IPathSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { LayoutPathModel, IPathSchema };
//# sourceMappingURL=graphConnections.model.d.ts.map