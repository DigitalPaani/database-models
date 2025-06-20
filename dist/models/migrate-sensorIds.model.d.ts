import mongoose, { Document } from "mongoose";
interface IMigrateSensorIds extends Document {
    latestId: string;
    oldIds: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare const MigrateSensorIdsModel: mongoose.Model<IMigrateSensorIds, {}, {}, {}, mongoose.Document<unknown, {}, IMigrateSensorIds> & IMigrateSensorIds & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { MigrateSensorIdsModel, IMigrateSensorIds };
//# sourceMappingURL=migrate-sensorIds.model.d.ts.map