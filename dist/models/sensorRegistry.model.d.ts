import mongoose, { Document, Types } from "mongoose";
interface IQuantity {
    value: number;
    unit: string;
}
interface IDriftQuantity extends IQuantity {
    per?: string;
}
interface IStuckTolerance {
    value: number;
    type: "FIXED" | "FSR";
}
interface IDataSheet {
    url: string;
    comments?: string;
}
interface ITemplateTag {
    tag: string;
    name: string;
    validMin?: number;
    validMax?: number;
    cautionMin?: number;
    cautionMax?: number;
    safeMin?: number;
    safeMax?: number;
    showCautionZone?: boolean;
    isThresholdConfigured?: boolean;
    frequency?: IQuantity;
    precision?: IQuantity;
    resolution?: IQuantity;
    drift?: IDriftQuantity;
    detectionLimit?: IQuantity;
    t90ResponseTime?: IQuantity;
    stuckWindowTimeMs?: number;
    oorPersistentWindowMs?: number;
    oorFlutteringWindowMs?: number;
    stuckTolerance?: IStuckTolerance;
    stuckMinThreshold?: number;
    stuckMaxThreshold?: number;
    dataSheets?: IDataSheet[];
    units?: string;
    technologyType?: string;
    signalType?: string;
}
interface ISensorRegistry extends Document {
    sensorName: string;
    sensorCompanyId: Types.ObjectId;
    sensorModelNumber: string;
    granularity: string[];
    purposeTags?: ITemplateTag[];
}
declare const SensorRegistryModel: mongoose.Model<ISensorRegistry, {}, {}, {}, mongoose.Document<unknown, {}, ISensorRegistry> & ISensorRegistry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { SensorRegistryModel, ISensorRegistry };
//# sourceMappingURL=sensorRegistry.model.d.ts.map