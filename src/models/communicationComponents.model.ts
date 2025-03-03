import { Model, Schema, model } from "mongoose";
import { COMMUNICATION_COMPONENT_TYPES } from "../constants/triggerConst";
import { Types } from "mongoose";
import commonConstants from "../constants/commonConstants";
require("./userGroupModel");
require("./plantModel");

// Interface for the message body
interface ICommunicationComponent extends Document {
  userIds: Types.ObjectId[]; // Array of User IDs
  emailSubject?: string; // Optional, for EMAIL type
  attachments?: { name: string; link: string; isReport: boolean }[]; // Optional, for EMAIL
  message?: string; // Present for EMAIL, CALL, SMS
  whatsappContentSid?: string; // Optional, for WHATSAPP
  whatsappContentVariables?: Record<string, string>; // Optional, for WHATSAPP
  type: string;
  userGroup?: Types.ObjectId;
  asset?: Types.ObjectId;
  messageFormat?: string; // Auto-complete feature for template selection.
  dashboardPageDetails?: {
    name: string;
    pageId: Types.ObjectId;
    format: string;
  };
  reportSelection?: { type: Boolean };
  issueSelection?: { type: Boolean };
  taskSelection?: { type: Boolean };
  issueRange?: { time: Number; unit: String; required: Boolean };
  taskRange?: { time: Number; unit: String; required: Boolean };
  taskFilter?: string;
  taskLimit?: number;
  issueFilter?: string;
  issueLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the embedded schema for the message body
const communicationComponentsSchema = new Schema(
  {
    userIds: { type: [Schema.Types.ObjectId], ref: "NewUser" },
    emailSubject: { type: String }, // Only for EMAIL type
    message: { type: String },
    attachments: [
      {
        name: String,
        link: String,
        isReport: { type: Boolean, default: false },
      },
    ],
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
    userGroup: { type: Schema.Types.ObjectId, ref: "UserGroup" },
    asset: { type: Schema.Types.ObjectId, ref: "Plant" },
    messageFormat: { type: String },
    dashboardPageDetails: {
      name: String,
      pageId: Types.ObjectId,
      format: String,
    },
    reportSelection: { type: Boolean },
    issueSelection: { type: Boolean },
    taskSelection: { type: Boolean },
    issueRange: { time: Number, unit: String, required: Boolean },
    taskRange: { time: Number, unit: String, required: Boolean },
    taskFilter: {
      type: String,
      enum: Object.values(commonConstants.TASK_OR_ISSUE_FILTERS),
    },
    taskLimit: { type: Number },
    issueFilter: {
      type: String,
      enum: Object.values(commonConstants.TASK_OR_ISSUE_FILTERS),
    },
    issueLimit: { type: Number },
  },
  { timestamps: true, strict: false }
);

const CommunicationComponentsModel: Model<ICommunicationComponent> =
  model<ICommunicationComponent>(
    "communicationComponents",
    communicationComponentsSchema,
    "communicationComponents"
  );

export { CommunicationComponentsModel, ICommunicationComponent };
