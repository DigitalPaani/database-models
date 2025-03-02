import mongoose from "mongoose";
interface ILayout extends Document {
    _id?: string;
    layout: object;
}
declare const LayoutModel: mongoose.Model<ILayout, {}, {}, {}, mongoose.Document<unknown, {}, ILayout> & ILayout & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { LayoutModel, ILayout };
//# sourceMappingURL=LayoutSchema.model.d.ts.map