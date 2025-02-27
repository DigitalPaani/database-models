import mongoose, { Document, Types } from "mongoose";
interface ITriggerLog extends Document {
    triggerId: Types.ObjectId;
    openTime?: number;
    closeTime?: number;
}
declare const TriggerLogsModel: mongoose.Model<ITriggerLog, {}, {}, {}, mongoose.Document<unknown, {}, ITriggerLog> & ITriggerLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { TriggerLogsModel, ITriggerLog };
//# sourceMappingURL=triggerLogs.model.d.ts.map