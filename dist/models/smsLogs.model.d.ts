import type { Document, Model } from "mongoose";
interface ISmsLog extends Document {
    from: string;
    to: string;
    message: string;
    libResponse: any;
    serviceType: string;
    code: string;
    status: string;
    errorDetails: any;
}
declare const SmsLogModel: Model<ISmsLog>;
export { SmsLogModel, ISmsLog };
//# sourceMappingURL=smsLogs.model.d.ts.map