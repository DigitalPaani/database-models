import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
import type { IPlant } from "./plantModel";
import type { ILayoutEquipment } from "./equipment.model";
import type { IAttachment } from "./attachments.model";
interface IInsight extends Document {
    name: string;
    description: string;
    equipmentIds: Types.ObjectId[] | ILayoutEquipment[];
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null | IAttachment;
    richTextContent: string;
    openTime: number;
    closeTime: number;
    priority: number;
    isOpen: boolean;
    assetId: Types.ObjectId | IPlant;
    insightComponentId: Types.ObjectId | null;
    isArchived: boolean;
}
declare const InsightModel: Model<IInsight>;
export { InsightModel, IInsight };
//# sourceMappingURL=insights.model.d.ts.map