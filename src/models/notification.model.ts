import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
  eventType: string;
  eventMessage: string;
  iconUrl?: string;
  priority: "low" | "medium" | "high";
  plantId: mongoose.Types.ObjectId;
  usergroupId?: mongoose.Types.ObjectId;
  to: {
    type: "user" | "usergroup";
    id: mongoose.Types.ObjectId;
  };
  timestamp: Date;
  createdBy: mongoose.Types.ObjectId;
  status: "read" | "unread";
  flag?: boolean;
  uriPath?: string;
  module?: Record<string, any>;
  escalation?: boolean;
  version?: number;
  templatedId?: mongoose.Types.ObjectId;
  triggerId?: mongoose.Types.ObjectId;
}

const NotificationSchema: Schema = new Schema(
  {
    eventType: { type: String, required: true },
    eventMessage: { type: String, required: true },
    iconUrl: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    plantId: { type: Schema.Types.ObjectId, ref: "Plant" },
    usergroupId: { type: Schema.Types.ObjectId, ref: "UserGroup" },
    to: {
      type: {
        type: String,
        enum: ["user", "usergroup"],
        required: true,
      },
      id: { type: Schema.Types.ObjectId, required: true },
    },
    timestamp: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread",
    },
    flag: { type: Boolean, default: false },
    uriPath: { type: String },
    module: { type: Schema.Types.Mixed },
    escalation: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    templatedId: { type: Schema.Types.ObjectId, ref: "Template" },
    triggerId: { type: Schema.Types.ObjectId, ref: "Trigger" },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model<INotification>(
  "NewNotifications",
  NotificationSchema,
  "NewNotifications"
);

export { NotificationModel, INotification };
