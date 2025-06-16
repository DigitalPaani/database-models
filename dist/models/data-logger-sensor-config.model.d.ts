import mongoose, { Types } from "mongoose";
interface IDLSensorConfig {
    dataLoggerId: Types.ObjectId;
    sensorId: Types.ObjectId;
    start?: number;
    end?: number;
    type: string;
    wordOrder: string;
    function?: string;
    scaledRequired?: boolean;
    scalingFactor?: number;
    totalizerRequired?: boolean;
    totalizerTag?: string;
    modbusMisfireTotalizer?: boolean;
    bitIndex?: number;
}
declare const DLSensorConfigModel: mongoose.Model<IDLSensorConfig, {}, {}, {}, mongoose.Document<unknown, {}, IDLSensorConfig> & IDLSensorConfig & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { DLSensorConfigModel, IDLSensorConfig };
//# sourceMappingURL=data-logger-sensor-config.model.d.ts.map