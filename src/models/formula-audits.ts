import type { Model } from "mongoose";
import mongoose from "mongoose";
import { formulasSchema, IFormula } from "./formulaModel";

const FormulaAuditsModel: Model<IFormula> = mongoose.model<IFormula>(
  "formulaAudits",
  formulasSchema,
  "formulaAudits"
);

export { FormulaAuditsModel };
