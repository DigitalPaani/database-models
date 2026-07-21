import mongoose, { Document } from "mongoose";
import { WatchdogCauseCode, WatchdogActionTaken } from "./watchdog-event.model";
declare const INCIDENT_TYPES: readonly ["connectivity", "device"];
declare const INCIDENT_STATUSES: readonly ["OPEN", "CLOSED"];
type IncidentType = (typeof INCIDENT_TYPES)[number];
type IncidentStatus = (typeof INCIDENT_STATUSES)[number];
interface IActionEntry {
    actionTaken: WatchdogActionTaken;
    at: Date;
}
interface IIncident extends Document {
    incidentId: string;
    incidentType: IncidentType;
    status: IncidentStatus;
    plantId: string;
    plcId: string;
    deviceId: string;
    currentCause: WatchdogCauseCode | null;
    actionHistory: IActionEntry[];
    startedAt: Date;
    recoveredAt: Date | null;
    downtimeSeconds: number | null;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const IncidentModel: mongoose.Model<IIncident, {}, {}, {}, mongoose.Document<unknown, {}, IIncident> & IIncident & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { IncidentModel, IIncident, IActionEntry, INCIDENT_TYPES, INCIDENT_STATUSES, IncidentType, IncidentStatus, };
//# sourceMappingURL=watchdog-incident.model.d.ts.map