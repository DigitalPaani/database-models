import mongoose, { Document } from "mongoose";
interface IDataInputLogs extends Document {
    requestId: string;
    status: string;
    record: any;
    errorMessage?: string;
}
declare const DataInputLogsModel: mongoose.Model<IDataInputLogs, {}, {}, {}, mongoose.Document<unknown, {}, IDataInputLogs> & IDataInputLogs & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { DataInputLogsModel, IDataInputLogs };
//# sourceMappingURL=data-input-logs.d.ts.map