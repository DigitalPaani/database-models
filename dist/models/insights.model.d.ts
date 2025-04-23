import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IInsights extends Document {
    name: string;
    description: string;
    equipmentTypes: string[];
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null;
    richTextContent: string;
    openTime: number;
    closeTime: number;
    isArchived: boolean;
}
declare const InsightsModel: Model<IInsights>;
export { InsightsModel, IInsights };
//# sourceMappingURL=insights.model.d.ts.map