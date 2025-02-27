import { Model, Schema, model } from "mongoose";
import {
  COMMUNICATION_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
} from "../constants/triggerConst";
import { Types } from "mongoose";

// Interface for the message body
interface ICommunicationComponent extends Document {
  userIds: Types.ObjectId[]; // Array of User IDs
  emailSubject?: string; // Optional, for EMAIL type
  attachments?: { name: string; link: string }[]; // Optional, for EMAIL
  message?: string; // Present for EMAIL, CALL, SMS
  whatsappContentSid?: string; // Optional, for WHATSAPP
  whatsappContentVariables?: Record<string, string>; // Optional, for WHATSAPP
  type: string;
}

// Define the embedded schema for the message body
const communicationComponentsSchema = new Schema(
  {
    userIds: [{ type: Schema.Types.ObjectId, ref: "NewUser" }],
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
  },
  { timestamps: true }
);

const CommunicationComponentsModel: Model<ICommunicationComponent> =
  model<ICommunicationComponent>(
    "communicationComponents",
    communicationComponentsSchema,
    "communicationComponents"
  );

export { CommunicationComponentsModel, ICommunicationComponent };
