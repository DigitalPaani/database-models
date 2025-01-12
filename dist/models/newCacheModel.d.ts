import type { Document, Model, Types } from "mongoose";
import type { FormulaCommonTypes } from "../types/formulaTypes";
interface INewCache extends Document {
    sensorTag: string;
    sensorSettingId: Types.ObjectId;
    details: FormulaCommonTypes.SensorSetting;
    values: Array<{
        timestamp: number;
        value: string[];
        isCalculated: boolean;
    }>;
}
declare const NewCacheModel: Model<INewCache>;
export { NewCacheModel, INewCache };
//# sourceMappingURL=newCacheModel.d.ts.map