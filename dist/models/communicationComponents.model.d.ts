import { Model } from "mongoose";
import { Types } from "mongoose";
interface ICommunicationComponent extends Document {
    userIds: Types.ObjectId[];
    emailSubject?: string;
    attachments?: {
        name: string;
        link: string;
        isReport: boolean;
    }[];
    message?: string;
    whatsappContentSid?: string;
    whatsappContentVariables?: Record<string, string>;
    type: string;
    userGroup?: Types.ObjectId;
    asset?: Types.ObjectId;
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
    createdAt?: Date;
    updatedAt?: Date;
}
declare const CommunicationComponentsModel: Model<ICommunicationComponent>;
export { CommunicationComponentsModel, ICommunicationComponent };
//# sourceMappingURL=communicationComponents.model.d.ts.map