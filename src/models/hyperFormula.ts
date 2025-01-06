import type { Document } from 'mongoose';
import mongoose from 'mongoose';
import { ARGUMENT_TYPES, HYPER_FORMULAS } from '../constants/formulaConst'

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

const hyperformulasSchema = new mongoose.Schema(
  {
    functionName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: HYPER_FORMULAS,
    },
    parameters: {
      type: [
        {
          argumentType: { type: String, enum: ARGUMENT_TYPES, trim: true },
          joinWith: String,
          minValue: Number,
          maxValue: Number,
          greaterThan: Number,
          lessThan: Number,
          defaultValue: Number,
          passSubtype: Boolean,
          isRequired: { type: Boolean, default: true },
          _id: false,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const HyperFormulaModel = mongoose.model<IHyperFormula>(
  'hyperformulas',
  hyperformulasSchema,
  'hyperformulas'
);

export { HyperFormulaModel, IHyperFormula };
