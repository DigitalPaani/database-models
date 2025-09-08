import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import commonConstants from "../constants/commonConstants";

interface IFormulaEvents extends Document {
  type: string;
  formulaId: Types.ObjectId;
  triggerId: Types.ObjectId;
  calculationTime: number;
  isAggregated: boolean;
  expiresAt?: Date;
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
    expiresAt: {
      type: Date,
      required: false,
      index: {
        expireAfterSeconds: 172800,
      }, // TTL index for automatic expiration
    },
  },
  {
    timestamps: true,
  }
);
const FormulaEventModel: Model<IFormulaEvents> = mongoose.model<IFormulaEvents>(
  "formulaEvents",
  formulaEventSchema,
  "formulaEvents"
);

export { FormulaEventModel, IFormulaEvents };
