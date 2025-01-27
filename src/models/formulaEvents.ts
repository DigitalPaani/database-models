import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IFormulaEvents extends Document {
  formulaId: Types.ObjectId;
  calculationTime: number;
  isAggregated: boolean;
}

const formulaEventSchema = new Schema<IFormulaEvents>(
  {
    formulaId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "formulas",
    },
    calculationTime: {
      type: Number,
      required: true,
    },
    isAggregated: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
formulaEventSchema.index({calculationTime:1},{expireAfterSeconds:86400})
const FormulaEventModel: Model<IFormulaEvents> = mongoose.model<IFormulaEvents>(
  "formulaEvents",
  formulaEventSchema,
  "formulaEvents"
);

export { FormulaEventModel, IFormulaEvents };
