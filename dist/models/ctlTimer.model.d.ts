import type { Model, Types } from "mongoose";
import { TimedStep } from "../constants/closeTheLoop.constants";
export declare const TIMER_KINDS: readonly ["LADDER_STEP", "DIGEST", "SWEEP", "HOOTER_WATCHDOG"];
export type TimerKind = (typeof TIMER_KINDS)[number];
export declare const TIMER_STATUSES: readonly ["PENDING", "CLAIMED", "DONE", "SKIPPED", "CANCELLED", "DEAD"];
export type TimerStatus = (typeof TIMER_STATUSES)[number];
export interface CtlTimerDoc {
    _id: Types.ObjectId;
    kind: TimerKind;
    ladderId: Types.ObjectId | null;
    issueId: Types.ObjectId | null;
    plantId: Types.ObjectId | null;
    step: TimedStep | null;
    generation: number;
    dueAt: Date;
    status: TimerStatus;
    leaseUntil: Date | null;
    claimedBy: string | null;
    attempts: number;
    lastError: string | null;
    completedAt: Date | null;
    singletonKey: string | null;
    createdAt: Date;
    updatedAt: Date;
}
declare const CtlTimerModel: Model<CtlTimerDoc>;
export default CtlTimerModel;
//# sourceMappingURL=ctlTimer.model.d.ts.map