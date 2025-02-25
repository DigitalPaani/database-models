import { Model } from "mongoose";
interface ICommunicationComponent {
    receiverName: string;
    to: string;
    attachment?: {
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