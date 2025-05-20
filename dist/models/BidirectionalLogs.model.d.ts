import mongoose, { Document, Types } from "mongoose";
interface IBidirectionalLogs extends Document {
    userId: Types.ObjectId;
    equipmentId: Types.ObjectId;
    assetId: Types.ObjectId;
    action: string;
    startTime: number;
    endTime?: number;
    ipAddress: string;
    events: any;
    success: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const BidirectionalLogsModel: mongoose.Model<IBidirectionalLogs, {}, {}, {}, mongoose.Document<unknown, {}, IBidirectionalLogs> & IBidirectionalLogs & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { BidirectionalLogsModel, IBidirectionalLogs };
//# sourceMappingURL=BidirectionalLogs.model.d.ts.map