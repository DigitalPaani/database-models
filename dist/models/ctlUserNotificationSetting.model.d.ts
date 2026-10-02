import type { Model, Types } from "mongoose";
import mongoose from "mongoose";
import { QuietWindow, RealtimeChannel, SeverityModes } from "../constants/closeTheLoop.constants";
export interface CtlUserNotificationSettingDoc {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    roleKey: string;
    modes: SeverityModes;
    quietHours: QuietWindow | null;
    quietHoursEnabled: boolean;
    realtimeChannel: RealtimeChannel;
    /** The Lead's one toggle: tell me when an issue is handed round without being started. */
    handoffAlerts: boolean;
    /** When the one-time "allow notifications" ask (A4) was shown. Server time. */
    pushPromptedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const quietWindowSchema: mongoose.Schema<QuietWindow, Model<QuietWindow, any, any, any, mongoose.Document<unknown, any, QuietWindow> & QuietWindow & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, QuietWindow, mongoose.Document<unknown, {}, mongoose.FlatRecord<QuietWindow>> & mongoose.FlatRecord<QuietWindow> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const CtlUserNotificationSettingModel: Model<CtlUserNotificationSettingDoc>;
export default CtlUserNotificationSettingModel;
//# sourceMappingURL=ctlUserNotificationSetting.model.d.ts.map