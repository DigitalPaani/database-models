import type { Model, Types } from "mongoose";
export interface CtlOutboxDoc {
    _id: Types.ObjectId;
    eventType: string;
    aggregateId: string;
    payload: Record<string, unknown>;
    occurredAt: Date;
    nextAttemptAt: Date;
    publishedAt: Date | null;
    deadAt: Date | null;
    attempts: number;
    lastError: string | null;
}
declare const CtlOutboxModel: Model<CtlOutboxDoc>;
export default CtlOutboxModel;
//# sourceMappingURL=ctlOutbox.model.d.ts.map