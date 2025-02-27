import { Model } from "mongoose";
import { Types } from "mongoose";
interface ICommunicationComponent extends Document {
    userIds: Types.ObjectId[];
    emailSubject?: string;
    attachments?: {
        name: string;
        link: string;
    }[];
    message?: string;
    whatsappContentSid?: string;
    whatsappContentVariables?: Record<string, string>;
    type: string;
}
declare const CommunicationComponentsModel: Model<ICommunicationComponent>;
export { CommunicationComponentsModel, ICommunicationComponent };
//# sourceMappingURL=communicationComponents.model.d.ts.map