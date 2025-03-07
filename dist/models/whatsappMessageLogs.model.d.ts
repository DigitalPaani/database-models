import type { Document, Model } from "mongoose";
interface IWhatsappLog extends Document {
    contentSid: string;
    contentVariables: any;
    from: string;
    to: string;
    libResponse: any;
    serviceType: string;
    code: string;
    status: string;
    errorDetails: any;
}
declare const WhatsappLogModel: Model<IWhatsappLog>;
export { WhatsappLogModel, IWhatsappLog };
//# sourceMappingURL=whatsappMessageLogs.model.d.ts.map