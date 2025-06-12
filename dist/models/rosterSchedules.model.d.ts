import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IRosterSchedule extends Document {
    rosterId: Types.ObjectId;
    userId: Types.ObjectId;
    reoccurrenceId: string;
    fromDate: number;
    toDate: number;
    bounds: object;
    slots: object[];
    rule: string;
    color: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const RosterSchedulesModel: Model<IRosterSchedule>;
export { RosterSchedulesModel, IRosterSchedule };
//# sourceMappingURL=rosterSchedules.model.d.ts.map