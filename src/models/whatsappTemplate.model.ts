import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IWhatsappTemplate extends Document {
  contentTemplateSid: string;
  templateName: string;
  templateContent: string;
  isArchived: boolean;
}

const whatsappTemplateSchema = new Schema<IWhatsappTemplate>(
  {
    contentTemplateSid: {
        type: String,
        required: false,  
    },
    templateName: {
        type: String,
        required: false,
    },
    templateContent: {
        type: String,
        required: false,  
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);


const WhatsappTemplateModel: Model<IWhatsappTemplate> = mongoose.model<IWhatsappTemplate>(
  'whatsappTemplates',
  whatsappTemplateSchema,
  'whatsappTemplates'
);


export { WhatsappTemplateModel, IWhatsappTemplate };