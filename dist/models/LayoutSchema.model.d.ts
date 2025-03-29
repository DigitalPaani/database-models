import mongoose from "mongoose";
interface ILayout extends Document {
    nodeId: string;
    layout: object;
}
declare const LayoutModel: mongoose.Model<ILayout, {}, {}, {}, mongoose.Document<unknown, {}, ILayout> & ILayout & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { LayoutModel, ILayout };
//# sourceMappingURL=LayoutSchema.model.d.ts.map