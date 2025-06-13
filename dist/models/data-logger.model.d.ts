import mongoose, { Document, Types } from "mongoose";
interface IDataLogger extends Document {
    name: string;
    description: string;
    assetId: Types.ObjectId;
    createdBy: Types.ObjectId;
    serialNumber?: string;
    code?: number;
    parentId?: Types.ObjectId;
    version: number;
    plcBrand?: string;
    plcId?: string;
    modbusHost?: string;
    modbusPort?: number;
    unitIdReal?: number;
    startAddressReal?: number;
    registerCountReal?: number;
    unitIdBool?: number;
    startAddressBool?: number;
    registerCountBool?: number;
    pollingInterval?: number;
    isDeleted: boolean;
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