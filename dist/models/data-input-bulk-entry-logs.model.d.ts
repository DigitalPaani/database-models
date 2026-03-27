import mongoose, { Types } from "mongoose";
interface IDataInputSchema {
    calculatedAt: number;
    sensorId: string;
    sensorTag: string;
    value: string;
    assetId: string;
}
interface IDataInputBulkEntryLogs {
    userId: string;
    dataInput: IDataInputSchema;
    fileLink: string;
    fileType: string;
}
declare const DataInputBulkEntryLogsModel: mongoose.Model<IDataInputBulkEntryLogs, {}, {}, {}, mongoose.Document<unknown, {}, IDataInputBulkEntryLogs> & IDataInputBulkEntryLogs & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { DataInputBulkEntryLogsModel, IDataInputBulkEntryLogs };
//# sourceMappingURL=data-input-bulk-entry-logs.model.d.ts.map