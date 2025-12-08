import mongoose, { Types } from "mongoose";
interface FlocChildSensors {
    FDSTParent: Types.ObjectId;
    SVOL30: Types.ObjectId;
    SVOL30Image: Types.ObjectId;
    SVOL60: Types.ObjectId;
    SVOL60Image: Types.ObjectId;
    SVOL90: Types.ObjectId;
    SVOL90Image: Types.ObjectId;
    SVOLRaw: Types.ObjectId;
    SVOLCustom: Types.ObjectId;
    SVOLCustomImage: Types.ObjectId;
    SVOLIssue: Types.ObjectId;
    SVOLIssueImage: Types.ObjectId;
}
export interface ISensor {
    _id?: Types.ObjectId;
    sensorName?: string;
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
    parentSensor?: Types.ObjectId | null;
    flocChildSensors?: FlocChildSensors;
    granularity?: number;
    confidenceScore?: number;
    category?: string;
}
declare const SensorsModel: mongoose.Model<ISensor & mongoose.Document<unknown, any, any>, {}, {}, {}, mongoose.Document<unknown, {}, ISensor & mongoose.Document<unknown, any, any>> & ISensor & mongoose.Document<unknown, any, any> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
type ISensorsData = ISensor;
export { SensorsModel, ISensorsData };
//# sourceMappingURL=sensorModel.d.ts.map