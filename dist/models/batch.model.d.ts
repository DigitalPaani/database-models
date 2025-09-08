import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IStatusCondition {
    status: string[];
    condition: string;
}
interface IBatchConfig extends Document {
    plantId: Types.ObjectId;
    batchName: string;
    equipmentTypes: string[];
    detectionLogic: {
        primary: string[];
        secondary?: string[];
    };
    trackingSensors: Types.ObjectId[];
    batchFlow: {
        startEquipment: Types.ObjectId;
        endEquipment: Types.ObjectId;
    };
    chemicalUsage: Types.ObjectId[];
    waterTreatmentUnit?: {
        unit?: string;
        value?: number;
    };
    batchType: string;
    batchPurpose?: string;
    statusConditions: IStatusCondition[];
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}
declare const BatchConfigModel: Model<IBatchConfig>;
export { BatchConfigModel, IBatchConfig };
//# sourceMappingURL=batch.model.d.ts.map