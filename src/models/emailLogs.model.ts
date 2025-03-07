import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

import { SERVICE_TYPES, CODES, LOGS_STATUS } from '../constants/notificationLogsConst';

interface IAttachment extends Document {
  name: string;
  link: string;
}

interface IEmailLog extends Document {
  from: string;
  to: string;
  subject: string;
  message: string;
  attachments: object[];
  libResponse: any;
  serviceType: string;
  code: string;
  status: string;
  errorDetails: any;
}

const attachmentSchema = new Schema<IAttachment>({
  name: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
})

const emailLogSchema = new Schema<IEmailLog>(
  {
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    subject: {
      type: String,
      required: false
    },
    message: {
        type: String,
        required: false
    },
    attachments: {
      type: [attachmentSchema],
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

const EmailLogModel: Model<IEmailLog> = mongoose.model<IEmailLog>(
  "emailLogs",
  emailLogSchema,
  "emailLogs"
);


export {
  EmailLogModel,
  IEmailLog
}