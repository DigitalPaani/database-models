import type { Document, Model } from "mongoose";
import mongoose, { Types } from "mongoose";
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
    parentFormulaId?: Types.ObjectId;
}
declare const formulasSchema: mongoose.Schema<IFormula, Model<IFormula, any, any, any, Document<unknown, any, IFormula> & IFormula & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IFormula, Document<unknown, {}, mongoose.FlatRecord<IFormula>> & mongoose.FlatRecord<IFormula> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
declare const FormulasModel: Model<IFormula>;
export { FormulasModel, IFormula, formulasSchema };
//# sourceMappingURL=formulaModel.d.ts.map