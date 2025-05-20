import mongoose, { Document, Types } from "mongoose";
interface IBidirectional extends Document {
    dataLoggerId: Types.ObjectId;
    assetId: Types.ObjectId;
    referenceSensors: any;
    equipmentId: Types.ObjectId;
    remoteControlSensorId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const BidirectionalModel: mongoose.Model<IBidirectional, {}, {}, {}, mongoose.Document<unknown, {}, IBidirectional> & IBidirectional & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { BidirectionalModel, IBidirectional };
//# sourceMappingURL=Bidirectional.model.d.ts.map