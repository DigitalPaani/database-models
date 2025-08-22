import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { EVENT_STATUS_ENUM } from "../constants/events.constants";

interface IEventLogs extends Document {
  eventComponentId: Types.ObjectId;
  name: string; 
  description?: string;
  eventDuration?: number; // Duration in seconds
  eventFrequency?: number;
  startTime: number;
  endTime?: number;
  eventStatus?: string; 
  workspaceId?: Types.ObjectId;
  assetId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventLogsSchema = new Schema<IEventLogs>(
  {
    eventComponentId: {
      type: Schema.Types.ObjectId,
      ref: "events-components",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    eventDuration: {
      type: Number,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
    },
    eventStatus: {
      type: String,
      enum: Object.values(EVENT_STATUS_ENUM),
      default: EVENT_STATUS_ENUM.INACTIVE,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "NewWorkspace",
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plants",
      required: true,
    }
  },
  { timestamps: true }
);

const EventLogsModel: Model<IEventLogs> = 
mongoose.model<IEventLogs>(
    "eventLogs", 
    eventLogsSchema,
    "eventLogs"
);

export { EventLogsModel, IEventLogs };