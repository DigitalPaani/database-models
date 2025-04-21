import { Model } from "mongoose";
import { Types } from "mongoose";
interface IInsightComponent extends Document {
    insightTemplateId: Types.ObjectId;
    userGroupId: Types.ObjectId;
    assetId: Types.ObjectId;
    equipmentIds: Types.ObjectId[];
    priority: string;
    isDeleted: boolean;
}
declare const InsightComponentModel: Model<IInsightComponent>;
export { InsightComponentModel, IInsightComponent };
//# sourceMappingURL=insightComponents.model.d.ts.map