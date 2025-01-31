import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IRosterEvent extends Document {
    rosterId: Types.ObjectId;
    eventId: string;
    title: string;
    fromDate: number;
    toDate: number;
    type: string;
    custom: string;
    color: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const RosterEventsModel: Model<IRosterEvent>;
export { RosterEventsModel, IRosterEvent };
//# sourceMappingURL=roster-events.model.d.ts.map