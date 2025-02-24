import type { Document, Model } from "mongoose";
interface ITwilioCall extends Document {
    from: string;
    to: string;
    message: string;
    retryingCount: number;
    callSid: string;
    callAnswered: boolean;
    serviceType: string;
    code: string;
}
declare const TwilioCallModel: Model<ITwilioCall>;
export { TwilioCallModel, ITwilioCall };
//# sourceMappingURL=twilioCalls.model.d.ts.map