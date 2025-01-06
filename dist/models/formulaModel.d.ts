import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
import { FormulaCommonTypes } from "../types/formulaTypes";
interface IFormula extends Document {
    version: number;
    name: string;
    description: string;
    createdBy: Types.ObjectId;
    plantId?: Types.ObjectId;
    unit: string;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    formulaTag: string;
    formulaChips: FormulaCommonTypes.FormulaChip[];
    applyToHistoricalData: boolean;
    variableList: string[];
    isArchived: boolean;
    frequency: FormulaCommonTypes.Frequency;
    type: string;
    nextCalculationTime: number;
    sensorSettingIds: Types.ObjectId[];
    formulaSensorId: Types.ObjectId;
}
declare const FormulasModel: Model<IFormula>;
export { FormulasModel, IFormula };
//# sourceMappingURL=formulaModel.d.ts.map