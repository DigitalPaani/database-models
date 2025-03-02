import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import commonConstants from "../constants/commonConstants";

interface IFormulaEvents extends Document {
  type: string;
  formulaId: Types.ObjectId;
  triggerId: Types.ObjectId;
  calculationTime: number;
  isAggregated: boolean;
}

const formulaEventSchema = new Schema<IFormulaEvents>(
  {
    type: {
      type: String,
      enum: Object.values(commonConstants.EVENT_TYPES),
      required: true,
      default: commonConstants.EVENT_TYPES.formula,
    },
    formulaId: {
      type: Schema.Types.ObjectId,
      ref: "formulas",
    },
    triggerId: {
      type: Schema.Types.ObjectId,
      ref: "triggers",
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
formulaEventSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 172800,
    partialFilterExpression: { formulaId: { $exists: true } },
  }
);
const FormulaEventModel: Model<IFormulaEvents> = mongoose.model<IFormulaEvents>(
  "formulaEvents",
  formulaEventSchema,
  "formulaEvents"
);

export { FormulaEventModel, IFormulaEvents };
