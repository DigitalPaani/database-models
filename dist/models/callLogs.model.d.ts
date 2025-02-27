import type { Document, Model } from "mongoose";
interface ICallLog extends Document {
    from: string;
    to: string;
    message: string;
    libResponse: any;
    serviceType: string;
    code: string;
    status: string;
    errorDetails: any;
}
declare const CallLogModel: Model<ICallLog>;
export { CallLogModel, ICallLog };
//# sourceMappingURL=callLogs.model.d.ts.map