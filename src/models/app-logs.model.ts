import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  APP_LOGS_ACTION_ENUM,
  APP_LOGS_MODULE_NAME,
} from "../constants/app-logs-const";

interface IAppLogs extends Document {
  module: string;
  previous?: Record<string, any>;
  current?: Record<string, any>;
  actionTakenBy: Types.ObjectId;
  action: string;
}

const appLogSchema = new Schema<IAppLogs>(
  {
    module: {
      type: String,
      enum: Object.values(APP_LOGS_MODULE_NAME),
      required: true,
    },
    previous: {
      type: Schema.Types.Mixed,
      required: false,
      default: {}
    },
    current: {
      type: Schema.Types.Mixed,
      required: false,
      default: {},
    },
    actionTakenBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(APP_LOGS_ACTION_ENUM),
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const AppLogsModel: Model<IAppLogs> = mongoose.model<IAppLogs>(
  "appLogs",
  appLogSchema,
  "app-logs"
);

export { AppLogsModel, IAppLogs };
