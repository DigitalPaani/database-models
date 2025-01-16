import type { Document, Model, Types } from "mongoose";
import type { FormulaCommonTypes } from "../types/formulaTypes";
interface INewCache extends Document {
    sensorTag: string;
    formulaId: Types.ObjectId;
    sensorSettingId: Types.ObjectId;
    details: FormulaCommonTypes.SensorSetting;
    firstDataDate: number | null;
    nextCalculationTime: number | null;
    rawValue: [number | null];
    values: Array<{
        timestamp: number;
        aggregatedValue: number[];
        isCalculated: boolean;
    }>;
}
declare const NewCacheModel: Model<INewCache>;
export { NewCacheModel, INewCache };
//# sourceMappingURL=newCacheModel.d.ts.map