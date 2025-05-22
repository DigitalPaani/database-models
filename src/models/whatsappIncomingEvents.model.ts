import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IWhatsappIncomingEvent extends Document {
    profileName: string;
    smsMessageSid: string;
    messageServiceId: string;
    messageType: string;
    from: string;
    to: string;
    body: string;
    smsStatus: string;
    twilioResponse: any;
}

const whatsappIncomingEventSchema = new Schema(
  {
    profileName: {
        type: String,
        required: false,  
    },
    smsMessageSid: {
      type: String,
      required: false,
    },
    messageServiceId: {
      type: String,
      required: false,
    },
    messageType: {
        type: String,
        required: false,
    },
    from: {
        type: String,
        required: false,
    },
    to: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    },
    smsStatus: {
        type: String,
        required: false,
    },
    twilioResponse: {
        type: Schema.Types.Mixed,
        required: false,
    }
  },
  {
    timestamps: true,
  }
);

const WhatsappIncomingEventModel: Model<IWhatsappIncomingEvent> = mongoose.model<IWhatsappIncomingEvent>(
  "whatsappIncomingMessagesEvents",
  whatsappIncomingEventSchema,
  "whatsappIncomingMessagesEvents"
);

export { WhatsappIncomingEventModel, IWhatsappIncomingEvent };


