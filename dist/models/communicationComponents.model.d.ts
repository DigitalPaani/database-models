import { Model } from "mongoose";
import { Types } from "mongoose";
interface ICommunicationComponent extends Document {
    _id: Types.ObjectId;
    receiverName: string;
    to: string;
    attachments?: {
        name: string;
        link: string;
    }[];
    message?: string;
    emailAttachment?: string;
    whatsappContentSid?: string;
    whatsappContentVariables?: Record<string, string>;
    type: string;
    serviceType: string;
    code: string;
}
declare const CommunicationComponentsModel: Model<ICommunicationComponent>;
export { CommunicationComponentsModel, ICommunicationComponent };
//# sourceMappingURL=communicationComponents.model.d.ts.map