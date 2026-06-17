import mongoose, { Document, Types } from "mongoose";
declare const DEVICE_STATUS: {
    readonly matched: "matched";
    readonly mismatched: "mismatched";
    readonly unknown: "unknown";
};
type DeviceStatus = (typeof DEVICE_STATUS)[keyof typeof DEVICE_STATUS];
interface IRemoteControlActionLog extends Document {
    equipmentId: Types.ObjectId;
    sensorId?: Types.ObjectId;
    userId?: Types.ObjectId;
    controlTopic: string;
    sensorTag: string;
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
declare const RemoteControlActionLogModel: mongoose.Model<IRemoteControlActionLog, {}, {}, {}, mongoose.Document<unknown, {}, IRemoteControlActionLog> & IRemoteControlActionLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { RemoteControlActionLogModel, IRemoteControlActionLog, DEVICE_STATUS, DeviceStatus, };
//# sourceMappingURL=remote-control-action-logs.model.d.ts.map