import mongoose, { Document, Types } from "mongoose";
interface IPlcData extends Document {
    nickName: string;
    plantId: Types.ObjectId;
    lastUpdateTime?: Date;
    lastMessageSentTime?: Date;
    connectionStatus: "online" | "offline";
    lastPinged?: Date;
}
declare const PlcModel: mongoose.Model<IPlcData, {}, {}, {}, mongoose.Document<unknown, {}, IPlcData> & IPlcData & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { PlcModel, IPlcData };
//# sourceMappingURL=plcModel.d.ts.map