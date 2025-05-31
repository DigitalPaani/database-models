import mongoose, { Document } from "mongoose";
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
declare const NotificationModel: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { NotificationModel, INotification };
//# sourceMappingURL=notification.model.d.ts.map