import mongoose, { Document, Types } from "mongoose";
interface IDataLogger extends Document {
    name: string;
    createdBy: Types.ObjectId;
    serialNumber: string;
    version: number;
    debug: boolean;
    plcBrand: string;
    plcModel: string;
    assetId: Types.ObjectId;
    modbusHost: string;
    modbusPort: number;
    unitIdReal: number;
    startAddressReal: number;
    registerCountReal: number;
    unitIdBool: number;
    startAddressBool: number;
    registerCountBool: number;
    pollingInterval: number;
    isDeleted: boolean;
    deletedBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const DataLoggerModel: mongoose.Model<IDataLogger, {}, {}, {}, mongoose.Document<unknown, {}, IDataLogger> & IDataLogger & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { DataLoggerModel, IDataLogger };
//# sourceMappingURL=data-logger.model.d.ts.map