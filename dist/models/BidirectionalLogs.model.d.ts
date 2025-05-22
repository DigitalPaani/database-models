import mongoose, { Document, Types } from "mongoose";
interface IBidirectionalLogs extends Document {
    userId: Types.ObjectId;
    bidirectionalId: Types.ObjectId;
    assetId: Types.ObjectId;
    controlValue: string;
    startTime: number;
    endTime?: number;
    ipAddress: string;
    events: {
        triggerId?: Types.ObjectId;
        sensorId?: Types.ObjectId;
        status: boolean;
    }[];
    success: boolean;
    isDeleted: boolean;
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