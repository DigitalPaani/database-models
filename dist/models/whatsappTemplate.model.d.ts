import type { Document, Model } from 'mongoose';
interface IWhatsappTemplate extends Document {
    contentTemplateSid: string;
    templateName: string;
    templateContent: string;
    isArchived: boolean;
}
declare const WhatsappTemplateModel: Model<IWhatsappTemplate>;
export { WhatsappTemplateModel, IWhatsappTemplate };
//# sourceMappingURL=whatsappTemplate.model.d.ts.map