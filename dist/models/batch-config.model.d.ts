import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IStatusCondition {
    status: string;
    event: Types.ObjectId;
    eventTag?: Types.ObjectId;
}
interface ITimeCycleRecurrence {
    frequency: string;
    interval: number;
    daysOfWeek: number[];
    dayOfMonth: number[];
    weekOfMonth: number[];
    month: number[];
}
interface ITimeCycleConfig {
    recurrence: ITimeCycleRecurrence;
    startDate?: Date;
    endDate?: Date;
    totalOccurrence?: number;
}
interface IBatchConfig extends Document {
    assetId: Types.ObjectId;
    batchName: string;
    batchEquipments: Types.ObjectId[];
    detectionLogic: {
        primary: string;
        selectedEvent?: Types.ObjectId;
        timeCycle?: ITimeCycleConfig;
    };
    trackingSensors: Types.ObjectId[];
    batchFlow: {
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
    batchType: string;
    batchPurpose?: string;
    statusConditions: IStatusCondition[];
    isArchived: boolean;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
declare const BatchConfigModel: Model<IBatchConfig>;
export { BatchConfigModel, IBatchConfig };
//# sourceMappingURL=batch-config.model.d.ts.map