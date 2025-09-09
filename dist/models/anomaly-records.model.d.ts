import mongoose, { Document, Types } from "mongoose";
interface IAnomalyRecord extends Document {
    anomalyDetailsId: Types.ObjectId;
    startTime: number;
    endTime: number;
    durationInMinutes: number;
    isIntersected: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const AnomalyRecordModel: mongoose.Model<IAnomalyRecord, {}, {}, {}, mongoose.Document<unknown, {}, IAnomalyRecord> & IAnomalyRecord & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { AnomalyRecordModel, IAnomalyRecord };
//# sourceMappingURL=anomaly-records.model.d.ts.map