import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
export interface IRosterEvent extends Document {
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
export { RosterEventsModel };
//# sourceMappingURL=roster-events.model.d.ts.map