import { Model, Schema, model } from "mongoose";
import {
  COMMUNICATION_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
} from "../constants/triggerConst";

// Interface for the message body
interface ICommunicationComponent {
  receiverName: string;
  to: string;
  attachment?: { name: string; link: string }[]; // Optional, for EMAIL
  message?: string; // Present for EMAIL, CALL, SMS
  emailAttachment?: string; // Optional, for EMAIL (S3 Link)
  whatsappContentSid?: string; // Optional, for WHATSAPP
  whatsappContentVariables?: Record<string, string>; // Optional, for WHATSAPP
  type: string;
  serviceType: string;
  code: string;
}

// Define the embedded schema for the message body
const communicationComponentsSchema = new Schema(
  {
    receiverName: { type: String },
    to: { type: String, required: true },
    emailSubject: { type: String }, // Only for EMAIL type
    message: { type: String },
    attachments: [{ name: String, link: String }],
    whatsappContentSid: { type: String }, // Only for WHATSAPP type
    whatsappContentVariables: {
      // Only for WHATSAPP type
      type: Schema.Types.Mixed,
      default: {},
    },
    type: {
      type: String,
      enum: Object.values(COMMUNICATION_COMPONENT_TYPES),
      required: true,
    },
    serviceType: {
      type: String,
      enum: Object.values(COMMUNICATION_COMPONENT_SERVICE_TYPE),
      required: true,
    },
    code: { type: String, required: true },
  },
  { _id: false }
);

const CommunicationComponentsModel: Model<ICommunicationComponent> =
  model<ICommunicationComponent>(
    "communicationComponents",
    communicationComponentsSchema,
    "communicationComponents"
  );

export { CommunicationComponentsModel, ICommunicationComponent };
