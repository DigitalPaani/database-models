import mongoose, { Types } from "mongoose";
interface IVisualizationDefaultView extends Document {
    equipmentId: Types.ObjectId;
    pageId: Types.ObjectId;
    isDefault: boolean;
}
declare const VisualizationDefaultViewModel: mongoose.Model<IVisualizationDefaultView, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationDefaultView> & IVisualizationDefaultView & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationDefaultViewModel, IVisualizationDefaultView };
//# sourceMappingURL=visualization-default-view.model.d.ts.map