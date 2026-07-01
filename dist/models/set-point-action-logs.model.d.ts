import mongoose, { Document, Types } from "mongoose";
declare const DEVICE_STATUS: {
    readonly matched: "matched";
    readonly mismatched: "mismatched";
    readonly unknown: "unknown";
};
type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];
interface ISetPointActionLog extends Document {
    setPointId: Types.ObjectId;
    sensorIds?: Types.ObjectId[];
    userId?: Types.ObjectId;
    controlTopic: string;
    sensorTag: string[];
    requestedAction: 0 | 1;
    payload?: unknown;
    published: boolean;
    publishedAt?: number;
    statusTopic?: string;
    acknowledged: boolean;
    acknowledgedAt?: number;
    rawMessage?: unknown;
    deviceValue?: number;
    deviceStatus: DeviceStatus;
    status: string;
    success: boolean;
    message?: string;
    errorDetails?: unknown;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const SetPointActionLogModel: mongoose.Model<ISetPointActionLog, {}, {}, {}, mongoose.Document<unknown, {}, ISetPointActionLog> & ISetPointActionLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { SetPointActionLogModel, ISetPointActionLog, DEVICE_STATUS, DeviceStatus, };
//# sourceMappingURL=set-point-action-logs.model.d.ts.map