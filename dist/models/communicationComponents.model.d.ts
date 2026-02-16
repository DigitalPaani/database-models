import { Model } from "mongoose";
import { Types } from "mongoose";
import type { INewUser } from "./newUserModel";
interface TimeRangeConfig {
    time: number;
    unit: string;
}
interface IInsightDigestConfig {
    lookbackRange: TimeRangeConfig;
    crossedThresholdRange: TimeRangeConfig;
}
interface ICommunicationComponent extends Document {
    name: string;
    userIds: Types.ObjectId[] | INewUser[];
    emailSubject?: string;
    attachments?: {
        name: string;
        link: string;
        filetype: string;
        isReport: boolean;
    }[];
    message?: string;
    messageType?: string;
    contentTemplateSid?: string;
    contentTemplateVariables?: Record<string, string>;
    type: string;
    userGroup?: Types.ObjectId;
    assetIds?: Types.ObjectId[];
    messageFormat?: string;
    dashboardPageDetails?: {
        name: string;
        pageId: Types.ObjectId;
        format: string;
    };
    reportSelection?: {
        type: Boolean;
    };
    issueSelection?: {
        type: Boolean;
    };
    taskSelection?: {
        type: Boolean;
    };
    issueRange?: {
        time: Number;
        unit: String;
        required: Boolean;
    };
    taskRange?: {
        time: Number;
        unit: String;
        required: Boolean;
    };
    taskFilter?: string;
    taskLimit?: number;
    issueFilter?: string;
    issueLimit?: number;
    insightDigestConfig?: IInsightDigestConfig;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const CommunicationComponentsModel: Model<ICommunicationComponent>;
export { CommunicationComponentsModel, ICommunicationComponent, IInsightDigestConfig };
//# sourceMappingURL=communicationComponents.model.d.ts.map