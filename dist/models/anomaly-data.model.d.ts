import mongoose, { Document, Types } from "mongoose";
interface IAnomalyData extends Document {
    triggerId: Types.ObjectId;
    formulaId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const anomalyDataSchema: mongoose.Schema<IAnomalyData, mongoose.Model<IAnomalyData, any, any, any, mongoose.Document<unknown, any, IAnomalyData> & IAnomalyData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IAnomalyData, mongoose.Document<unknown, {}, mongoose.FlatRecord<IAnomalyData>> & mongoose.FlatRecord<IAnomalyData> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
declare const AnomalyDataModel: mongoose.Model<IAnomalyData, {}, {}, {}, mongoose.Document<unknown, {}, IAnomalyData> & IAnomalyData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { AnomalyDataModel, anomalyDataSchema };
//# sourceMappingURL=anomaly-data.model.d.ts.map