import type { Document, Model } from "mongoose";
import mongoose, { Types } from "mongoose";
import { FormulaCommonTypes } from "../types/formulaTypes";
interface IchangeOfFormula extends Document {
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
declare const changeOfFormulaSchema: mongoose.Schema<IchangeOfFormula, Model<IchangeOfFormula, any, any, any, Document<unknown, any, IchangeOfFormula> & IchangeOfFormula & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IchangeOfFormula, Document<unknown, {}, mongoose.FlatRecord<IchangeOfFormula>> & mongoose.FlatRecord<IchangeOfFormula> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
declare const changeOfFormulasModel: Model<IchangeOfFormula>;
export { changeOfFormulasModel, IchangeOfFormula, changeOfFormulaSchema };
//# sourceMappingURL=change-of-formulas.d.ts.map