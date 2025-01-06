"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperFormulaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formulaConst_1 = require("../constants/formulaConst");
const hyperformulasSchema = new mongoose_1.default.Schema({
    functionName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        enum: formulaConst_1.HYPER_FORMULAS,
    },
    parameters: {
        type: [
            {
                argumentType: { type: String, enum: formulaConst_1.ARGUMENT_TYPES, trim: true },
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
}, {
    timestamps: true,
});
// Create the model
const HyperFormulaModel = mongoose_1.default.model('hyperformulas', hyperformulasSchema, 'hyperformulas');
exports.HyperFormulaModel = HyperFormulaModel;
