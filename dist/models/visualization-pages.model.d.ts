import mongoose, { Types } from "mongoose";
interface IVisualizationPages extends Document {
    name: string;
    workspaceId: Types.ObjectId;
    description: string;
    totalEquipments: string;
    isArchived: string;
}
declare const VisualizationPagesModel: mongoose.Model<IVisualizationPages, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationPages> & IVisualizationPages & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationPagesModel, IVisualizationPages };
//# sourceMappingURL=visualization-pages.model.d.ts.map