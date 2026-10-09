import mongoose, { Document } from "mongoose";
declare const WATCHDOG_EVENT_TYPES: readonly ["BREAK_START", "CAUSE_CHANGE", "ACTION", "RECOVERY", "DEVICE_DOWN", "DEVICE_UP", "DATALOGGER_STARTUP"];
declare const WATCHDOG_CAUSE_CODES: readonly ["CABLE_UNPLUGGED", "WIFI_DISCONNECTED", "WIFI_WEAK_SIGNAL", "ROUTER_UNREACHABLE", "WAN_DOWN", "PLC_DOWN", "HMI_DOWN", "FIRST_START", "SCRIPT_RESTART", "SYSTEM_BOOT_CLEAN", "SYSTEM_BOOT_UNCLEAN"];
declare const WATCHDOG_ACTIONS_TAKEN: readonly ["NONE", "NET_RESET", "ROUTER_REBOOT", "DATALOGGER_REBOOT"];
type WatchdogEventType = (typeof WATCHDOG_EVENT_TYPES)[number];
type WatchdogCauseCode = (typeof WATCHDOG_CAUSE_CODES)[number];
type WatchdogActionTaken = (typeof WATCHDOG_ACTIONS_TAKEN)[number];
interface IWatchdogEvent extends Document {
    eventId: string;
    incidentId: string;
    plantId: string;
    plcId: string;
    deviceId: string;
    event: WatchdogEventType;
    causeCode: WatchdogCauseCode | null;
    actionTaken: WatchdogActionTaken;
    downtimeSeconds: number | null;
    detail: unknown;
    TIMESTAMP: string;
    receivedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const WatchdogEventModel: mongoose.Model<IWatchdogEvent, {}, {}, {}, mongoose.Document<unknown, {}, IWatchdogEvent> & IWatchdogEvent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { WatchdogEventModel, IWatchdogEvent, WATCHDOG_EVENT_TYPES, WATCHDOG_CAUSE_CODES, WATCHDOG_ACTIONS_TAKEN, WatchdogEventType, WatchdogCauseCode, WatchdogActionTaken, };
//# sourceMappingURL=watchdog-event.model.d.ts.map