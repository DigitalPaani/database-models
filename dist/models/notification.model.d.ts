import mongoose, { Document } from "mongoose";
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
declare const NotificationModel: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { NotificationModel, INotification };
//# sourceMappingURL=notification.model.d.ts.map