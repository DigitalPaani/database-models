import mongoose, { Document } from "mongoose";
export interface ISensorCounterState extends Document {
    sensorId: string;
    stuckValues: number[];
    oorCount: number;
    inRangeCount: number;
    oorEpisodeActive: boolean;
    wasLastValueOOR: boolean;
    oorTripCount: number;
    oorTripWindowStart?: number;
    lastReturnToInRangeTime?: number;
    lastCalculatedAt?: number;
    updatedAt?: Date;
}
export declare const SensorCounterStateModel: mongoose.Model<ISensorCounterState, {}, {}, {}, mongoose.Document<unknown, {}, ISensorCounterState> & ISensorCounterState & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=sensor-counter-state.model.d.ts.map