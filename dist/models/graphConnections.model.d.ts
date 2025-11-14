import mongoose from "mongoose";
interface ILayoutSet {
    from: string;
    to: string;
    path: string[];
}
interface IPathSchema extends Document {
    graphId: string;
    layoutSets: ILayoutSet[];
}
declare const LayoutPathModel: mongoose.Model<IPathSchema, {}, {}, {}, mongoose.Document<unknown, {}, IPathSchema> & IPathSchema & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { LayoutPathModel, IPathSchema };
//# sourceMappingURL=graphConnections.model.d.ts.map