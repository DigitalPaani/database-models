import { TRIGGER_SCOPE, TRIGGER_TYPES } from "../constants/triggerConst";
import type { Document, Model, Types } from "mongoose";
import type { TriggerTypes } from "../types/triggerTypes";
interface ITriggerDocument extends Document {
    name: string;
    description: string;
    dateAsText?: string;
    scope: (typeof TRIGGER_SCOPE)[keyof typeof TRIGGER_SCOPE];
    userGroup?: Types.ObjectId;
    type: (typeof TRIGGER_TYPES)[keyof typeof TRIGGER_TYPES];
    startDate?: number;
    endDate?: number;
    totalOccurrence?: number;
    occurrenceLeft?: number;
    recurrence?: TriggerTypes.Recurrence;
    conditions?: TriggerTypes.Conditions;
    triggerComponent: TriggerTypes.TriggerData[];
    createdBy: Types.ObjectId;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TriggerModel: Model<ITriggerDocument>;
export { TriggerModel, ITriggerDocument };
//# sourceMappingURL=trigger.model.d.ts.map