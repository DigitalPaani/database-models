import mongoose, { Document } from "mongoose";
export interface ISensorOpenFault extends Document {
    sensorId: string;
    eventId: string;
    plantId: string;
    detectedAt: number;
    confidence: "MEDIUM" | "HIGH";
    faultType: "STUCK" | "OUT_OF_RANGE" | "DATA_BREAK";
    subState: "NONE" | "FLUTTERING" | "PERSISTENT";
    updatedAt?: Date;
}
export declare const SensorOpenFaultModel: mongoose.Model<ISensorOpenFault, {}, {}, {}, mongoose.Document<unknown, {}, ISensorOpenFault> & ISensorOpenFault & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=sensor-open-fault.model.d.ts.map