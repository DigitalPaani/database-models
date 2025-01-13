import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import {
  FORMULA_TYPES,
  FORMULA_UNITS,
  FORMULAS_CHIP_TYPES,
} from "../constants/formulaConst";
import { FormulaCommonTypes } from "../types/formulaTypes";
require("./sensorModel");

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
  formulaChips: FormulaCommonTypes.FormulaChip[];
  applyToHistoricalData: boolean;
  variableList: string[];
  isArchived: boolean;
  frequency: FormulaCommonTypes.Frequency;
  type: string;
  nextCalculationTime: number;
  sensorSettingIds: Types.ObjectId[];
  formulaSensorId: Types.ObjectId;
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
    createdBy: { type: Schema.ObjectId, ref: "NewUser", required: true },
    plantId: { type: Schema.ObjectId, ref: "Plant", required: false },
    unit: { type: String, required: true, enum: FORMULA_UNITS },
    userGroupId: {
      type: Schema.ObjectId,
      ref: "UserGroup",
      required: true,
    } as any,
    workspaceId: {
      type: Schema.ObjectId,
      ref: "NewWorkspace",
      required: true,
    } as any,
    formulaTag: { type: String, required: true },
    formulaChips: {
      type: [
        {
          value: { type: String, trim: true, required: true },
          type: { type: String, required: true, enum: FORMULAS_CHIP_TYPES },
          sensorSetting: Object,
        },
      ],
      required: true,
    },
    applyToHistoricalData: { type: Boolean, required: true },
    variableList: { type: [String], required: true } as any,
    isArchived: { type: Boolean, required: true, default: false },
    frequency: { type: frequencySchema, required: false },
    type: { type: String, enum: FORMULA_TYPES, required: false },
    nextCalculationTime: {
      type: Number,
      required: true,
      default: () => {
        const currentDate = new Date();
        currentDate.setSeconds(0, 0);
        return currentDate.getTime() + 1000 * 60 * 2;
      }, // 1 minute from the current time,
    },
    sensorSettingIds: { type: [Schema.ObjectId], ref: "SensorSettings" }, // Reference the `sensors` model
    formulaSensorId: { type: Schema.ObjectId, required: true, ref: "sensors" },
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
