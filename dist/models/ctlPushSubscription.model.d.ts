import type { Model, Types } from "mongoose";
/** One browser that asked for notifications (A4 "Allow", Profile "Turn on"). */
export interface CtlPushSubscriptionDoc {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    /** The push service URL the browser handed us. Unique: one browser, one owner. */
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    expirationTime: number | null;
    device: {
        userAgent: string;
        installed: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}
declare const CtlPushSubscriptionModel: Model<CtlPushSubscriptionDoc>;
export default CtlPushSubscriptionModel;
//# sourceMappingURL=ctlPushSubscription.model.d.ts.map