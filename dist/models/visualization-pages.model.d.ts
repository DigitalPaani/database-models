import mongoose from "mongoose";
interface IVisualizationPages extends Document {
    name: string;
    description: string;
    totalEquipments: string;
    isArchived: string;
}
declare const VisualizationPagesModel: mongoose.Model<IVisualizationPages, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationPages> & IVisualizationPages & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationPagesModel, IVisualizationPages };
//# sourceMappingURL=visualization-pages.model.d.ts.map