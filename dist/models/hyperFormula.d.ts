import type { Document } from 'mongoose';
import mongoose from 'mongoose';
interface IHyperFormulaParameter {
    dataType: string;
    joinWith?: string;
    minValue?: number;
    maxValue?: number;
    greaterThan?: number;
    lessThan?: number;
    defaultValue?: number;
    passSubtype?: boolean;
    isRequired: boolean;
}
interface IHyperFormula extends Document {
    functionName: string;
    parameters: IHyperFormulaParameter[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare const HyperFormulaModel: mongoose.Model<IHyperFormula, {}, {}, {}, Document<unknown, {}, IHyperFormula> & IHyperFormula & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { HyperFormulaModel, IHyperFormula };
//# sourceMappingURL=hyperFormula.d.ts.map