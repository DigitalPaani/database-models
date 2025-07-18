import mongoose, { Types } from "mongoose";
interface IDLSensorConfigAudit {
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
declare const DLSensorConfigAuditModel: mongoose.Model<IDLSensorConfigAudit, {}, {}, {}, mongoose.Document<unknown, {}, IDLSensorConfigAudit> & IDLSensorConfigAudit & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export { DLSensorConfigAuditModel, IDLSensorConfigAudit };
//# sourceMappingURL=dl-sensor-config-audit.model.d.ts.map