import mongoose, { Types } from "mongoose";
interface IDLSensorConfig {
    dataLoggerId: Types.ObjectId;
    sensorId: Types.ObjectId;
    sensorType: "analog" | "boolean";
    referenceSensorId?: Types.ObjectId;
    referenceSensorPurpose?: string;
    scalingFactor?: number;
    start?: number;
    end?: number;
    type?: string;
    wordOrder?: string;
    function?: string;
    modbusMisfireTotalizer?: boolean;
    bitIndex?: number;
    version: number;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const dataLoggerSensorConfigSchema: mongoose.Schema<IDLSensorConfig, mongoose.Model<IDLSensorConfig, any, any, any, mongoose.Document<unknown, any, IDLSensorConfig> & IDLSensorConfig & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IDLSensorConfig, mongoose.Document<unknown, {}, mongoose.FlatRecord<IDLSensorConfig>> & mongoose.FlatRecord<IDLSensorConfig> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const DLSensorConfigModel: mongoose.Model<IDLSensorConfig, {}, {}, {}, mongoose.Document<unknown, {}, IDLSensorConfig> & IDLSensorConfig & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { DLSensorConfigModel, IDLSensorConfig, dataLoggerSensorConfigSchema };
//# sourceMappingURL=data-logger-sensor-config.model.d.ts.map