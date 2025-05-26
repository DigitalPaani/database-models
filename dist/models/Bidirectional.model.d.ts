import mongoose, { Document, Types } from "mongoose";
interface IBidirectional extends Document {
    dataLoggerId: Types.ObjectId;
    assetId: Types.ObjectId;
    referenceSensors: {
        controlSensorId: Types.ObjectId;
        tripSensorId: Types.ObjectId;
        hmiSensorId: Types.ObjectId;
        softwareSensorId: Types.ObjectId;
        manualSensorId: Types.ObjectId;
        bypassFormulaSensorId: Types.ObjectId;
    };
    equipmentId: Types.ObjectId;
    bidirectionalSensorId: Types.ObjectId;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const BidirectionalModel: mongoose.Model<IBidirectional, {}, {}, {}, mongoose.Document<unknown, {}, IBidirectional> & IBidirectional & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { BidirectionalModel, IBidirectional };
//# sourceMappingURL=bidirectional.model.d.ts.map