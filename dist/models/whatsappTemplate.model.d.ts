import type { Document, Model } from 'mongoose';
interface IVariable extends Document {
    position: number;
    value: string;
    allowedInputs: string[];
}
interface IWhatsappTemplate extends Document {
    contentTemplateSid: string;
    templateName: string;
    templateContent: string;
    variables: IVariable[];
    isArchived: boolean;
}
declare const WhatsappTemplateModel: Model<IWhatsappTemplate>;
export { WhatsappTemplateModel, IWhatsappTemplate };
//# sourceMappingURL=whatsappTemplate.model.d.ts.map