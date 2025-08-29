import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IStatusCondition {
    status: string;
    eventComponent: Types.ObjectId;
    action: string;
}
interface ITimeCycleRecurrence {
    frequency: string;
    interval: number;
    daysOfWeek: number[];
    dayOfMonth: number[];
    weekOfMonth: number[];
    hours: number[];
    minutes: number[];
}
interface ITimeCycleConfig {
    recurrence: ITimeCycleRecurrence;
    startDate?: Date;
    endDate?: Date;
}
interface IBatchComponent extends Document {
    assetId: Types.ObjectId;
    name: string;
    equipments: Types.ObjectId[];
    detectionType: string;
    startBatchEventComponentId?: Types.ObjectId;
    startBatchAction: string;
    timeCycle?: ITimeCycleConfig;
    trackingSensors: Types.ObjectId[];
    flow: {
        nodes: unknown[];
        edges: unknown[];
    };
    chemicalUsage?: {
        chemicalName: string;
        itemId: Types.ObjectId;
    }[];
    waterTreatment?: {
        unit?: string;
        value?: number;
    };
    type: string;
    purpose?: string;
    startTriggerId?: Types.ObjectId;
    endTriggerId?: Types.ObjectId;
    statusConditions: IStatusCondition[];
    isArchived: boolean;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
declare const BatchComponentModel: Model<IBatchComponent>;
export { BatchComponentModel, IBatchComponent };
//# sourceMappingURL=batch-component.model.d.ts.map