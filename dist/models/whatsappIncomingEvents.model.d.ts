import type { Document, Model } from "mongoose";
interface IWhatsappIncomingEvent extends Document {
    profileName: string;
    messageServiceId: string;
    messageType: string;
    from: string;
    to: string;
    body: string;
    smsStatus: string;
    twilioResponse: any;
}
declare const WhatsappIncomingEventModel: Model<IWhatsappIncomingEvent>;
export { WhatsappIncomingEventModel, IWhatsappIncomingEvent };
//# sourceMappingURL=whatsappIncomingEvents.model.d.ts.map