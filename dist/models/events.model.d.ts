import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IEvent extends Document {
    eventComponentId: Types.ObjectId;
    name: string;
    description?: string;
    eventDuration?: number;
    eventFrequency?: number;
    startTime: Date;
    endTime?: Date;
    eventStatus?: string;
    workspaceId?: Types.ObjectId;
    assetId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const EventModel: Model<IEvent>;
export { EventModel, IEvent };
//# sourceMappingURL=events.model.d.ts.map