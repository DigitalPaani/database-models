import { Model } from "mongoose";
import { Types } from "mongoose";
import { ISensor } from "./SensorList";
interface IInsightComponent extends Document {
    _id: Types.ObjectId;
    insightTemplateId: Types.ObjectId;
    triggerId: Types.ObjectId;
    name: string;
    description: string;
    insightClassification: string;
    insightType: string;
    attachmentId: Types.ObjectId | null;
    richTextContent: string;
    userGroupId: Types.ObjectId;
    assetId: Types.ObjectId;
    equipmentIds: Types.ObjectId[];
    priority: Number;
    startInsightSensorId: Types.ObjectId | ISensor;
    isDeleted: boolean;
}
declare const InsightComponentModel: Model<IInsightComponent>;
export { InsightComponentModel, IInsightComponent };
//# sourceMappingURL=insight-components.model.d.ts.map