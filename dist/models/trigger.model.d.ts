import { TRIGGER_SCOPE, TRIGGER_TYPES } from "../constants/triggerConst";
import type { Document, Model, Types } from "mongoose";
import type { TriggerTypes } from "../types/triggerTypes";
interface ITriggerDocument extends Document {
    name: string;
    description: string;
    recurrenceText?: string;
    scope: (typeof TRIGGER_SCOPE)[keyof typeof TRIGGER_SCOPE];
    triggerTag: string;
    userGroup?: Types.ObjectId;
    workspace?: Types.ObjectId;
    assets?: Types.ObjectId[];
    type: (typeof TRIGGER_TYPES)[keyof typeof TRIGGER_TYPES];
    startDate?: number;
    endDate?: number;
    totalOccurrence?: number;
    recurrence?: TriggerTypes.Recurrence;
    conditions?: TriggerTypes.Conditions;
    triggerComponents: Types.ObjectId[];
    createdBy: Types.ObjectId;
    triggerSensorId: Types.ObjectId;
    status: string;
    isOpen: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TriggerModel: Model<ITriggerDocument>;
export { TriggerModel, ITriggerDocument };
//# sourceMappingURL=trigger.model.d.ts.map