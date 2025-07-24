import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

import { INewUser } from "./newUserModel";
import communicationConstants from "../constants/communication.constants";


interface ISender {
  type: "USER" | "DOCTOR_PAANI";
  interactionContext?: "USER" | "BIDIRECTIONAL" | "INSIGHTS" | "INGESTION";
  userId?: Types.ObjectId | INewUser;
}


interface IReceiver {
  userId: Types.ObjectId | INewUser;
}

interface IContent {
  message: string;
  channel: "WHATSAPP" | "SMS" | "CALL" | "EMAIL";
  emailBody: string;
}


type attachment = {
  filename: string,
  url: string,
  filetype: string
};


interface IGeneralCommunication extends Document {
  sender: ISender;
  receiver: IReceiver;
  content: IContent;
  
  deliveryStatus?: string;

  isMultipleConversations?: boolean;
  multipleConversationPartner: string;
  
  isArchived?: boolean;
  status?: "READ" | "UNREAD";

  errorDetails?: string;
  tags?: string[];
  meta?: Record<string, any>;
  attachments?: attachment[];

  viewedAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}



// Sender Schema
const senderSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["USER", "DOCTOR_PAANI"],
      required: true,
    },
    interactionContext: {
      type: String,
      enum: ["USER", "BIDIRECTIONAL", "INSIGHTS", "INGESTION"],
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: false,
    },
  },
  { _id: false }
);

const attachmentSchema = new Schema(
  {
    filename: {
      type: String
    },
    url: {
      type: String
    },
    filetype: {
      type: String
    }
  }
);

// Receiver Schema
const receiverSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
  },
  { _id: false }
);

// Content Schema
const contentSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ["WHATSAPP", "SMS", "CALL", "EMAIL"],
      required: true,
    },
    emailBody: {
      type: String,
      default: ""
    },
  },
  { _id: false }
);

// Main Schema (Composed)
const generalCommunicationSchema = new Schema(
  {
    sender: senderSchema,
    receiver: receiverSchema,
    content: contentSchema,

    deliveryStatus: {
      type: String,
      enum: communicationConstants.DELIVERY_STATUS_ENUMS,
      default: "NOT_AVAILABLE",
    },

    isMultipleConversations: {
      type: Boolean,
      default: false,
    },

    multipleConversationPartner: {
      type: String,
      enum: ["BIDIRECTIONAL"],
      required: false
    },

    status: {
      type: String,
      enum: ["READ", "UNREAD"],
      default: "UNREAD",
    },

    errorDetails: {
      type: String,
      default: null,
    },

    tags: {
      type: [String],
      enum: ["REPORT"],
      default: [],
    },

    meta: {
      type: Schema.Types.Mixed,
      default: {},
    },

    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    viewedAt: {
      type: Date,
      default: null
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const GeneralCommunicationModel: Model<IGeneralCommunication> =
  mongoose.model<IGeneralCommunication>(
    "generalCommunication",
    generalCommunicationSchema,
    "generalCommunication"
  );

export { GeneralCommunicationModel, IGeneralCommunication };
