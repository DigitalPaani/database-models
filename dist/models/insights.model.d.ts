import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IInsight extends Document {
    name: string;
    description: string;
    equipmentTypes: string[];
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null;
    richTextContent: string;
    openTime: number;
    closeTime: number;
    priority: number;
    isArchived: boolean;
}
declare const InsightModel: Model<IInsight>;
export { InsightModel, IInsight };
//# sourceMappingURL=insights.model.d.ts.map