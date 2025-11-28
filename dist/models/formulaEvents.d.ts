import type { Document, Model, Types } from "mongoose";
interface IFormulaEvents extends Document {
    type: string;
    formulaId: Types.ObjectId;
    triggerId: Types.ObjectId;
    calculationTime: number;
    isAggregated: boolean;
    processCount: number;
    expiresAt?: Date;
}
declare const FormulaEventModel: Model<IFormulaEvents>;
export { FormulaEventModel, IFormulaEvents };
//# sourceMappingURL=formulaEvents.d.ts.map