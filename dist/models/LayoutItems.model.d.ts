import mongoose from "mongoose";
interface ISize {
    height: number;
    width: number;
}
interface ITargetAttributes {
    size: ISize;
}
interface ILayoutItem extends Document {
    type: string;
    size: ISize;
    name: string;
    targetAttributes: ITargetAttributes;
    family: string;
}
declare const LayoutItemsModel: mongoose.Model<ILayoutItem, {}, {}, {}, mongoose.Document<unknown, {}, ILayoutItem> & ILayoutItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { LayoutItemsModel, ILayoutItem };
//# sourceMappingURL=LayoutItems.model.d.ts.map