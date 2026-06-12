import mongoose, { Types } from "mongoose";
interface IVisualizationDefaultView extends Document {
    workspaceId: Types.ObjectId;
    userId: Types.ObjectId;
    defaultViewLink: string;
}
declare const VisualizationDefaultViewModel: mongoose.Model<IVisualizationDefaultView, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationDefaultView> & IVisualizationDefaultView & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationDefaultViewModel, IVisualizationDefaultView };
//# sourceMappingURL=visualization-default-view.model.d.ts.map