import mongoose from "mongoose";
interface ISize {
    height: number;
    width: number;
}
interface ITargetAttributes {
    size: ISize;
}
interface ISidebarLayoutItem extends Document {
    type: string;
    abbr: string;
    size: ISize;
    name: string;
    targetAttributes: ITargetAttributes;
    family: string;
}
declare const SidebarLayoutItemsModel: mongoose.Model<ISidebarLayoutItem, {}, {}, {}, mongoose.Document<unknown, {}, ISidebarLayoutItem> & ISidebarLayoutItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { SidebarLayoutItemsModel, ISidebarLayoutItem };
//# sourceMappingURL=SidebarLayoutItems.model.d.ts.map