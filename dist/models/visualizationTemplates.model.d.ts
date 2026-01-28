import mongoose from "mongoose";
interface IVisualizationTemplatesLayout extends Document {
    name: string;
    isArchived: string;
}
declare const VisualizationTemplatesModel: mongoose.Model<IVisualizationTemplatesLayout, {}, {}, {}, mongoose.Document<unknown, {}, IVisualizationTemplatesLayout> & IVisualizationTemplatesLayout & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export { VisualizationTemplatesModel, IVisualizationTemplatesLayout };
//# sourceMappingURL=visualizationTemplates.model.d.ts.map