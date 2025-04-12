import type { Document, Model } from "mongoose";
interface IInsightsTemplate extends Document {
    name: string;
    description: string;
    equipmentTypes: string[];
    insightType: string;
    attachmentId: string;
    richTextContent: string;
    isArchived: boolean;
}
declare const InsightsTemplateModel: Model<IInsightsTemplate>;
export { InsightsTemplateModel, IInsightsTemplate };
//# sourceMappingURL=insights-template.model.d.ts.map