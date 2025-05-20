import mongoose, { Document, Types } from "mongoose";
interface IDataLogger extends Document {
    name: string;
    description: string;
    assetId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const DataLoggerModel: mongoose.Model<IDataLogger, {}, {}, {}, mongoose.Document<unknown, {}, IDataLogger> & IDataLogger & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { DataLoggerModel, IDataLogger };
//# sourceMappingURL=DataLogger.model.d.ts.map