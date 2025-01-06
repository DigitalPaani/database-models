import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { FORMULA_TYPES, FORMULA_UNITS } from "../constants/formulaConst";
import { FormulaCommonTypes } from "../types/formulaTypes";

interface IFormula extends Document {
  version: number;
  name: string;
  description: string;
  createdBy: Types.ObjectId;
  plantId?: Types.ObjectId;
  unit: string;
  userGroupId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  formulaTag: string;
  formulaChips: string[];
  applyToHistoricalData: boolean;
  variableList: string[];
  isArchived: boolean;
  frequency: FormulaCommonTypes.Frequency;
  type: string;
  nextCalculationTime: number;
  sensorSettingIds: Types.ObjectId[];
}

const frequencySchema = new Schema<FormulaCommonTypes.Frequency>({
  dateTime: {
    type: Number,
    required: false,
  },
  sensorId: {
    type: Types.ObjectId,
    required: false,
  } as any,
  timeInMinutes: {
    type: Number,
    required: true,
  },
});

const formulasSchema = new Schema<IFormula>(
  {
    version: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "NewUser", required: true } as any,
    plantId: { type: Types.ObjectId, ref: "Plant", required: false } as any,
    unit: { type: String, required: true, enum: FORMULA_UNITS },
    userGroupId: {
      type: Types.ObjectId,
      ref: "UserGroup",
      required: true,
    } as any,
    workspaceId: {
      type: Types.ObjectId,
      ref: "NewWorkspace",
      required: true,
    } as any,
    formulaTag: { type: String, required: true },
    formulaChips: { type: [String], required: true },
    applyToHistoricalData: { type: Boolean, required: true },
    variableList: { type: [String], required: true } as any,
    isArchived: { type: Boolean, required: true, default: false },
    frequency: { type: frequencySchema, required: false },
    type: { type: String, enum: FORMULA_TYPES, required: false },
    nextCalculationTime: {
      type: Number,
      required: true,
      default: Date.now() + 1000 * 60,
    },
    sensorSettingIds: { type: [Types.ObjectId], ref: "SensorSettings" }, // Reference the `sensors` model
  },
  {
    timestamps: true,
  }
);

const FormulasModel: Model<IFormula> = mongoose.model<IFormula>(
  "formulas",
  formulasSchema,
  "formulas"
);

export { FormulasModel, IFormula };
