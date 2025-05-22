import type { Document, Model } from "mongoose";
interface IWhatsappAiCommunication extends Document {
    role: string;
    content: string;
    assistantResponse: any;
}
declare const WhatsappAiCommunicationModel: Model<IWhatsappAiCommunication>;
export { WhatsappAiCommunicationModel, IWhatsappAiCommunication };
//# sourceMappingURL=whatsapp-ai-communication.model.d.ts.map