import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IWhatsappAiCommunication extends Document {
    from: string;
    to: string;
    role: string;
    content: string;
    assistantResponse: any;
}

const whatsappAiCommunication = new Schema<IWhatsappAiCommunication>(
  {
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
    role: {
        type: String,
        enum: ["USER", "ASSISTANT"],
        required: false,  
    },
    content: {
      type: String,
      required: false,
    },
    assistantResponse: {
        type: Schema.Types.Mixed,
        required: false,
    }
  },
  {
    timestamps: true,
  }
);

const WhatsappAiCommunicationModel: Model<IWhatsappAiCommunication> = mongoose.model<IWhatsappAiCommunication>(
  "whatsappAiCommunications",
  whatsappAiCommunication,
  "whatsappAiCommunications"
);

export { WhatsappAiCommunicationModel, IWhatsappAiCommunication };


