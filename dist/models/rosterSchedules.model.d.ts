import type { Model } from 'mongoose';
import { Schema, Types } from 'mongoose';
interface IRosterSchedule {
    rosterId: Schema.Types.ObjectId;
    userId: Types.ObjectId;
    reoccurrenceId: string;
    fromDate: number;
    toDate: number;
    bounds: object;
    slots: object[];
    rule: string;
    color: string;
    isArchived: boolean;
    createdBy: Schema.Types.ObjectId;
}
declare const RosterSchedulesModel: Model<IRosterSchedule>;
export { RosterSchedulesModel, IRosterSchedule };
//# sourceMappingURL=rosterSchedules.model.d.ts.map