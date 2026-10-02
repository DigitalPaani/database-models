import type { Model, Types } from "mongoose";
import type { LadderStep, ReadingTrend, Severity } from "../constants/closeTheLoop.constants";
export declare const LADDER_STATUSES: readonly ["OPEN", "CLOSED"];
export type LadderStatus = (typeof LADDER_STATUSES)[number];
/** The measurement that crossed the rule's threshold, as the trigger sent it. Same shape on the feed, the push and the landing page. */
export interface LadderReading {
    value: number;
    unit: string;
    /** Free text on what normal looks like, e.g. "alarm above 80". */
    band: string | null;
    trend: ReadingTrend | null;
}
export interface CtlLadderDoc {
    _id: Types.ObjectId;
    issueId: Types.ObjectId;
    plantId: Types.ObjectId;
    title: string;
    plantName: string;
    severity: Severity;
    peakSeverity: Severity;
    openedAt: Date;
    anchorAt: Date;
    generation: number;
    currentStep: LadderStep;
    status: LadderStatus;
    startedAt: Date | null;
    /** Who holds it. Take-over moves this, and the feed shows it. */
    startedBy: Types.ObjectId | null;
    /** Hand-off times while unstarted, trimmed to HANDOFF_WINDOW_MS in the same write that adds one. */
    handoffs: Date[];
    closedAt: Date | null;
    lastAlertAt: Date | null;
    lastAlertSeverity: Severity | null;
    hooterFiredAt: Date | null;
    /**
     * When someone pressed Start on the Emergency (the alarm's "Start and silence").
     * Kept apart from the device's own acknowledgement on the HOOTER attempt: the
     * "hooter may not have sounded" watchdog must still hear about a device that
     * never answered, whoever tapped Start.
     */
    hooterSilencedAt: Date | null;
    hooterSilencedBy: Types.ObjectId | null;
    /** From the trigger's ingest payload when it sends them; null until then. */
    area: string | null;
    equipment: string | null;
    reading: LadderReading | null;
    /** Who closed the Issue, when /ingest/issue-closed says. */
    closedBy: Types.ObjectId | null;
    suppressedAlerts: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const CtlLadderModel: Model<CtlLadderDoc>;
export default CtlLadderModel;
//# sourceMappingURL=ctlLadder.model.d.ts.map