import { Model } from "mongoose";
import { Types } from "mongoose";
import { ISensor } from "./sensorModel";
interface IDynamicValue extends Document {
    type: string;
    key: string;
    value: string;
}
interface IInsightComponent extends Document {
    _id: Types.ObjectId;
    insightTemplateId: Types.ObjectId;
    dynamicNameValues: IDynamicValue[];
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
    rcaEnabled: boolean;
    rcaContent: string;
    isTimeSensitive: boolean;
    userIdsForTimeSensitive: Types.ObjectId[];
    isDeleted: boolean;
}
declare const InsightComponentModel: Model<IInsightComponent>;
export { InsightComponentModel, IInsightComponent };
//# sourceMappingURL=insight-components.model.d.ts.map