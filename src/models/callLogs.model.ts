import type { Document, Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

import { SERVICE_TYPES, CODES, LOGS_STATUS } from '../constants/notificationLogsConst';

interface ICallLog extends Document {
  from: string;
  to: string;
  message: string;
  libResponse: any;
  serviceType: string;
  code: string;
  status: string;
  errorDetails: any;
}

const callLogSchema = new Schema(
  {
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    libResponse: {
      type: Schema.Types.Mixed,
      required: false,
    },
    status: {
      type: String,
      enum: LOGS_STATUS,
      required: false,
    },
    serviceType: {
      type: String,
      enum: SERVICE_TYPES,
      required: false,
    },
    code: {
      type: String,
      enum: CODES,
      required: false,
    },
    errorDetails: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CallLogModel: Model<ICallLog> = mongoose.model<ICallLog>(
  "callLogs",
  callLogSchema,
  "callLogs"
);

export { CallLogModel, ICallLog };
