import mongoose, { Schema, Document, Model } from "mongoose";

// Define the embedded schema for the message body
interface INotification extends Document {
  eventType: string;
  eventMessage: string;
  iconUrl?: string;
  iconId?: string;
  priority: "low" | "medium" | "high";
  plantId: mongoose.Types.ObjectId;
  usergroupId?: mongoose.Types.ObjectId;
  to: {
    id: mongoose.Types.ObjectId;
  };
  timestamp: number;
  createdBy: mongoose.Types.ObjectId;
  status: "read" | "unread";
  flag?: boolean;
  uriPath?: string;
  module?: Record<string, any>;
  escalation?: boolean;
  version?: number;
  templatedId?: mongoose.Types.ObjectId;
  triggerId?: mongoose.Types.ObjectId;
  type: string;
}

const NotificationSchema: Schema = new Schema(
  {
    eventType: { type: String, required: true },
    eventMessage: { type: String, required: true },
    iconUrl: { type: String },
    iconId: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    plantId: { type: Schema.Types.ObjectId, ref: "Plant", default: null },
    usergroupId: { type: Schema.Types.ObjectId, ref: "UserGroup" },
    to: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    timestamp: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["read", "unread"],
      default: "unread",
    },
    viewedAt: { type: Date, default: null },
    flag: { type: Boolean, default: false },
    uriPath: { type: String },
    module: { type: Schema.Types.Mixed },
    escalation: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    templatedId: { type: Schema.Types.ObjectId, ref: "Template" },
    triggerId: { type: Schema.Types.ObjectId, ref: "Trigger" },
    type: { type: String },
  },
  { timestamps: true }
);

const NotificationComponentsModel: Model<INotification> =
  mongoose.model<INotification>(
    "notificationComponents",
    NotificationSchema,
    "notificationComponents"
  );

export { NotificationComponentsModel, INotification };
