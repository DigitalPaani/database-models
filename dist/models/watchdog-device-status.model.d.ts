import mongoose, { Document } from "mongoose";
import { WatchdogEventType } from "./watchdog-event.model";
declare const DEVICE_STATUSES: readonly ["ONLINE", "OFFLINE"];
type DeviceStatus = (typeof DEVICE_STATUSES)[number];
interface IDeviceStatus extends Document {
    deviceId: string;
    plantId: string;
    plcId: string;
    status: DeviceStatus;
    lastEvent: WatchdogEventType;
    lastEventAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const DeviceStatusModel: mongoose.Model<IDeviceStatus, {}, {}, {}, mongoose.Document<unknown, {}, IDeviceStatus> & IDeviceStatus & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { DeviceStatusModel, IDeviceStatus, DEVICE_STATUSES, DeviceStatus, };
//# sourceMappingURL=watchdog-device-status.model.d.ts.map