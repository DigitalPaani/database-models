import type { Document, Model, Types } from "mongoose";
interface IFormulaEvents extends Document {
    formulaId: Types.ObjectId;
    calculationTime: number;
    isAggregated: boolean;
}
declare const FormulaEventModel: Model<IFormulaEvents>;
export { FormulaEventModel, IFormulaEvents };
//# sourceMappingURL=formulaEvents.d.ts.map