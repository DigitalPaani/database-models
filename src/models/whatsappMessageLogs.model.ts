import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

import { SERVICE_TYPES, CODES, LOGS_STATUS } from '../constants/notificationLogsConst';

interface IWhatsappLog extends Document {
  contentSid: string,
  contentVariables: any,
  from: string;
  to: string;
  libResponse: any;
  serviceType: string;
  code: string;
  status: string;
  errorDetails: any;
}

const whatsappLogSchema = new Schema(
  {
    contentSid: {
      type: String,
      required: false
    },
    contentVariables: {
      type: Schema.Types.Mixed,
      required: false
    },
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    libResponse: {
        type: Schema.Types.Mixed,
        required: false
    },
    serviceType: {
        type: String,
        enum: SERVICE_TYPES,
        required: false
    },
    code: {
        type: String,
        enum: CODES,
        required: false
    },
    status: {
      type: String,
      enum: LOGS_STATUS,
      required: false
    },
    errorDetails: {
      type: Schema.Types.Mixed,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const WhatsappLogModel: Model<IWhatsappLog> = mongoose.model<IWhatsappLog>(
  "whatsappLogs",
  whatsappLogSchema,
  "whatsappLogs"
);

export {
  WhatsappLogModel,
  IWhatsappLog
}
