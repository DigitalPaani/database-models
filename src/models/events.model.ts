import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IEvent extends Document {
  eventComponentId: Types.ObjectId;
  name: string; 
  description?: string;
  eventDuration?: number; // Duration in seconds
  eventFrequency?: number;
  startTime: Date;
  endTime?: Date;
  eventStatus?: string; 
  workspaceId?: Types.ObjectId;
  assetId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
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
    startTime: {
      type: Date,
      required: true,
    },
    eventStatus: {
      type: String,
      enum: ["Active", "Inactive"]
    },
    endTime: {
      type: Date,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "NewWorkspace",
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    }
  },
  { timestamps: true }
);

const EventModel: Model<IEvent> = 
mongoose.model<IEvent>(
    "events", 
    eventSchema,
    "events"
);

export { EventModel, IEvent };