import type { Document, Model } from "mongoose";
interface IEmailLog extends Document {
    from: string;
    to: string;
    subject: string;
    message: string;
    libResponse: any;
    serviceType: string;
    code: string;
    status: string;
    errorDetails: any;
}
declare const EmailLogModel: Model<IEmailLog>;
export { EmailLogModel, IEmailLog };
//# sourceMappingURL=emailLogs.model.d.ts.map