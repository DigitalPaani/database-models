import mongoose, { Document, Model } from "mongoose";
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
declare const NotificationComponentsModel: Model<INotification>;
export { NotificationComponentsModel, INotification };
//# sourceMappingURL=notificationComponents.model.d.ts.map