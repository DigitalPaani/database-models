import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IWhatsappAiCommunication extends Document {
    userId: Types.ObjectId;
    from: string;
    to: string;
    role: string;
    content: string;
    assistantResponse: any;
}

const whatsappAiCommunication = new Schema<IWhatsappAiCommunication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ASSISTANT"],
        required: true,  
    },
    content: {
      type: String,
      required: false,
    },
    assistantResponse: {
        type: Schema.Types.Mixed,
        required: true,
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


