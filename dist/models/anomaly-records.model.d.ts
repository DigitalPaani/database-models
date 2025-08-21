import mongoose, { Document, Types } from "mongoose";
interface IAnomalyRecord extends Document {
    sensorId: Types.ObjectId;
    startDate: number;
    endDate: number;
    values: [number];
    formulaId: Types.ObjectId;
    isDuplicate: boolean;
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