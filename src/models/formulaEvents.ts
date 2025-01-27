import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IFormulaEvents extends Document {
  formulaId: Types.ObjectId;
  calculationTime: number;
  isAggregated: boolean;
  ttlDate:Date;
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
    ttlDate: {
      type: Date, // Additional field for TTL indexing
      required: true,
    },
    isAggregated: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
formulaEventSchema.pre("save", function (next) {
  this.ttlDate = new Date(this.calculationTime); // Convert epoch milliseconds to Date
  next();
});

const FormulaEventModel: Model<IFormulaEvents> = mongoose.model<IFormulaEvents>(
  "formulaEvents",
  formulaEventSchema,
  "formulaEvents"
);

export { FormulaEventModel, IFormulaEvents };
