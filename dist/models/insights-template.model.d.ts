import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IInsightsTemplate extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    equipmentTypes: string[];
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null;
    richTextContent: string;
    isArchived: boolean;
}
declare const InsightsTemplateModel: Model<IInsightsTemplate>;
export { InsightsTemplateModel, IInsightsTemplate };
//# sourceMappingURL=insights-template.model.d.ts.map