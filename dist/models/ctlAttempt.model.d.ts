import type { Model, Types } from "mongoose";
import { Channel, LadderStep, Language, RouteReason, Severity } from "../constants/closeTheLoop.constants";
export declare const ATTEMPT_STATUSES: readonly ["PENDING", "SENDING", "SENT", "FAILED", "DEAD", "ACKED", "UNACKED"];
export type AttemptStatus = (typeof ATTEMPT_STATUSES)[number];
export declare const ATTEMPT_KINDS: readonly ["LADDER", "NAMED", "WATCHDOG", "COVERAGE", "DIGEST"];
export type AttemptKind = (typeof ATTEMPT_KINDS)[number];
export interface AttemptPayload {
    to: string;
    language: Language;
    templateKey: string;
    message: string;
    link: string | null;
    emailSubject: string | null;
    code: string;
    /** Hooter commands only: how long the device should sound. */
    durationSec: number | null;
}
export interface CtlAttemptDoc {
    _id: Types.ObjectId;
    idempotencyKey: string;
    kind: AttemptKind;
    issueId: Types.ObjectId | null;
    ladderId: Types.ObjectId | null;
    plantId: Types.ObjectId | null;
    userId: Types.ObjectId | null;
    channel: Channel;
    severity: Severity;
    step: LadderStep;
    generation: number;
    reason: RouteReason;
    status: AttemptStatus;
    attempts: number;
    nextRetryAt: Date | null;
    claimedAt: Date | null;
    claimedBy: string | null;
    providerRef: string | null;
    lastError: string | null;
    sentAt: Date | null;
    ackDeadlineAt: Date | null;
    ackedAt: Date | null;
    payload: AttemptPayload;
    createdAt: Date;
    updatedAt: Date;
}
declare const CtlAttemptModel: Model<CtlAttemptDoc>;
export default CtlAttemptModel;
//# sourceMappingURL=ctlAttempt.model.d.ts.map