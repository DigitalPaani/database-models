import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
import { FormulaCommonTypes } from "../types/formulaTypes";
export interface IFormula extends Document {
    version: number;
    name: string;
    description: string;
    createdBy: Types.ObjectId;
    plantId?: Types.ObjectId;
    unit: string;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    formulaTag: string;
    formulaChips: string[];
    applyToHistoricalData: boolean;
    variableList: string[];
    isArchived: boolean;
    frequency: FormulaCommonTypes.Frequency;
    type: string;
    nextCalculationTime: number;
    sensorSettingIds: Types.ObjectId[];
}
declare const FormulasModel: Model<IFormula>;
export default FormulasModel;
//# sourceMappingURL=formulaModel.d.ts.map