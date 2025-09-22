import mongoose, { Document, Types } from "mongoose";
interface IAnomalyDetails extends Document {
    sensorId: Types.ObjectId;
    formulaId: Types.ObjectId;
    configStartTime: number;
    configEndTime: number;
    noise: boolean;
    sensitivity: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const AnomalyDetailsModel: mongoose.Model<IAnomalyDetails, {}, {}, {}, mongoose.Document<unknown, {}, IAnomalyDetails> & IAnomalyDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { AnomalyDetailsModel, IAnomalyDetails };
//# sourceMappingURL=anomaly-details.model.d.ts.map