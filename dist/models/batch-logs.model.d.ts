import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IBatchLog extends Document {
    batchConfigId: Types.ObjectId;
    startTime: number;
    endTime?: number;
    duration?: number;
    status: string;
    previousStatus?: string;
    detectionType: string;
    triggeredBy: string;
    triggeredEventId?: Types.ObjectId;
    triggeredTimeCycle?: {
        frequency: string;
        interval: number;
        startDate: number;
    };
    hasErrors: boolean;
    errorCount?: number;
    lastErrorTime?: number;
    concurrentBatchIds: string[];
    insightIds: Types.ObjectId[];
    taskIds: Types.ObjectId[];
    plantId: Types.ObjectId;
    assetId: Types.ObjectId;
    createdBy?: Types.ObjectId;
    isArchived: boolean;
}
declare const BatchLogModel: Model<IBatchLog>;
export { BatchLogModel, IBatchLog };
//# sourceMappingURL=batch-logs.model.d.ts.map