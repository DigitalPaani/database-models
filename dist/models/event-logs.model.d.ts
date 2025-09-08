import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IEventLogs extends Document {
    eventComponentId: Types.ObjectId;
    name: string;
    description?: string;
    eventDuration?: number;
    eventFrequency?: number;
    startTime: number;
    endTime?: number;
    eventStatus?: string;
    workspaceId?: Types.ObjectId;
    assetId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const EventLogsModel: Model<IEventLogs>;
export { EventLogsModel, IEventLogs };
//# sourceMappingURL=event-logs.model.d.ts.map