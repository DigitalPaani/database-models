import mongoose, { Types } from "mongoose";
export interface ISensor {
    _id?: Types.ObjectId;
    sensorTag: string;
    sensorNickName: string;
    plantId?: Types.ObjectId;
    storeId?: Types.ObjectId;
    dataType: string;
    sensorType: string;
    dataInputType: string;
    plcId?: Types.ObjectId;
    isEnabled: boolean;
    sensorTypeAbr?: string;
    oldSensorTag?: string;
    sensorOffSet?: Types.ObjectId;
}
declare const SensorModel: mongoose.Model<ISensor & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, ISensor & mongoose.Document<unknown, any, any>> & ISensor & mongoose.Document<unknown, any, any> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default SensorModel;
//# sourceMappingURL=sensorModel.d.ts.map