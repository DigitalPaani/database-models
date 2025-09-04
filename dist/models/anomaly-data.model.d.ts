import mongoose, { Document, Types } from "mongoose";
interface IAnomalyData extends Document {
    triggerId: Types.ObjectId;
    formulaId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const AnomalyDataModel: mongoose.Model<IAnomalyData, {}, {}, {}, mongoose.Document<unknown, {}, IAnomalyData> & IAnomalyData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { IAnomalyData, AnomalyDataModel };
//# sourceMappingURL=anomaly-data.model.d.ts.map