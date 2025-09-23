import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import {
  FORMULA_TYPES,
  FORMULA_UNITS,
  FORMULAS_CHIP_TYPES,
} from "../constants/formulaConst";
import { FormulaCommonTypes } from "../types/formulaTypes";
require("./sensorModel");
require("./workspaceModel");
require("./newUserModel");
require("./plantModel");
require("./userGroupModel");
require("./sensorSettingModel");

interface IchangeOfFormula extends Document {
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
  parentFormulaId?: Types.ObjectId;
}

const frequencySchema = new Schema<FormulaCommonTypes.Frequency>({
  dateTime: {
    type: Number,
    required: false,
  },
  sensorId: {
    type: Types.ObjectId,
    required: false,
    ref: "sensors",
  } as any,
  timeInMinutes: {
    type: Number,
    required: true,
  },
});

const changeOfFormulaSchema = new Schema<IchangeOfFormula>(
  {
    version: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.ObjectId, ref: "NewUser", required: true },
    plantId: { type: Schema.ObjectId, ref: "Plant", required: false },
    formulaTag: { type: String, required: true },
    formulaChips: {
      type: [
        {
          value: { type: String, trim: true, required: true },
          type: { type: String, required: true, enum: FORMULAS_CHIP_TYPES },
          color: { type: String, trim: true, required: false },
          sensorSetting: {
            type: Types.ObjectId,
            required: false,
            ref: "SensorSettings",
          },
        },
      ],
      required: true,
    },
    isArchived: { type: Boolean, required: true, default: false },
    sensorSettingIds: { type: [Schema.ObjectId], ref: "SensorSettings" }, // Reference the `sensors` model
    formulaSensorId: { type: Schema.ObjectId, required: true, ref: "sensors" },
    parentFormulaId: { type: Schema.ObjectId, required: false, ref: "formulaAudits" },
  },
  {
    timestamps: true,
  }
);

const changeOfFormulasModel: Model<IchangeOfFormula> = mongoose.model<IchangeOfFormula>(
  "changeOfformulas",
  changeOfFormulaSchema,
  "changeOfformulas"
);

export { changeOfFormulasModel, IchangeOfFormula, changeOfFormulaSchema };
