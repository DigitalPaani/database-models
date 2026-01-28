import mongoose from "mongoose";
interface IVisualizationTemplatesLayout extends Document {
    nodeId: string;
    layout: object;
    version: number;
}
declare const VisualizationTemplatesModel: mongoose.Model<IVisualizationTemplatesLayout, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationTemplatesLayout> & IVisualizationTemplatesLayout & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationTemplatesModel, IVisualizationTemplatesLayout };
//# sourceMappingURL=visualizationTemplates.model.d.ts.map