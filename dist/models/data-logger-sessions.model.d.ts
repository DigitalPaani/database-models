import mongoose, { Document } from "mongoose";
interface IDataLoggerSession extends Document {
    code: number;
    serialNumber: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const DataLoggerSessionModel: mongoose.Model<IDataLoggerSession, {}, {}, {}, mongoose.Document<unknown, {}, IDataLoggerSession> & IDataLoggerSession & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { DataLoggerSessionModel, IDataLoggerSession };
//# sourceMappingURL=data-logger-sessions.model.d.ts.map