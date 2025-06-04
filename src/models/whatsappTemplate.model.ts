import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

import commonConstants from '../constants/commonConstants';

interface IVariable extends Document {
  position: number,
  value: string,
  allowedInputs: string[]
};

interface IWhatsappTemplate extends Document {
  contentTemplateSid: string;
  templateName: string;
  templateContent: string;
  variables: IVariable[]
  isArchived: boolean;
};


const variableSchema = new Schema<IVariable>({
  position: {
    type: Number,
    required: true
  },
  value: {
    type: String,
    enum: Object.values(commonConstants.WHATSAPP_TEMPLATE_VARIABLES),
    required: true
  },
  allowedInputs: {
    type: [String],
    enum: Object.values(commonConstants.WHATSAPP_TEMPLATE_ALLOWED_INPUTS),
    default: []
  }
});


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
    variables: {
      type: [variableSchema],
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