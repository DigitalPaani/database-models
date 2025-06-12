import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IWhatsappAiCommunication extends Document {
    userId: Types.ObjectId;
    from: string;
    to: string;
    role: string;
    content: string;
    assistantResponse: any;
}
declare const WhatsappAiCommunicationModel: Model<IWhatsappAiCommunication>;
export { WhatsappAiCommunicationModel, IWhatsappAiCommunication };
//# sourceMappingURL=whatsapp-ai-communication.model.d.ts.map