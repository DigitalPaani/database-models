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
interface IBatchConfig extends Document {
    assetId: Types.ObjectId;
    batchName: string;
    batchEquipments: Types.ObjectId[];
    batchDetectionType: string;
    startBatchEventComponentId?: Types.ObjectId;
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
declare const BatchConfigModel: Model<IBatchConfig>;
export { BatchConfigModel, IBatchConfig };
//# sourceMappingURL=batch-config.model.d.ts.map