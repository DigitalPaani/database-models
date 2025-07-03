import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

import { INewUser } from "./newUserModel";



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
  channel: "WHATSAPP" | "SMS" | "CALL" | "EMAIL" | "REPORT" | "NOTIFICATION";
}

interface IGeneralCommunication extends Document {
  sender: ISender;
  receiver: IReceiver;
  content: IContent;
  
  deliveryStatus?: "STATUS_NOT_AVAILABLE" | "PENDING" | "SENT" | "DELIVERED" | "FAILED";

  isMultipleConversations?: boolean;
  multipleConversationPartner: string;
  
  isArchived?: boolean;
  isRead?: boolean;
  status?: "ACTIVE" | "INACTIVE";

  errorDetails?: string;
  tags?: string[];
  meta?: Record<string, any>;

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
      enum: ["STATUS_NOT_AVAILABLE", "PENDING", "SENT", "UNDELIVERED", "DELIVERED", "FAILED"],
      default: "STATUS_NOT_AVAILABLE",
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

    isRead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
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

    emailAttachments: {
      type: [String],
      default: [],
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
