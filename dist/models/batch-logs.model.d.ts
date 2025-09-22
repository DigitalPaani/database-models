import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IBatchLog extends Document {
    batchComponentId: Types.ObjectId;
    startTime: number;
    endTime?: number;
    duration?: number;
    status: string;
    previousStatus?: string;
    detectionType: string;
    initiatedBy: Types.ObjectId;
    eventComponentId?: Types.ObjectId;
}
declare const BatchLogModel: Model<IBatchLog>;
export { BatchLogModel, IBatchLog };
//# sourceMappingURL=batch-logs.model.d.ts.map