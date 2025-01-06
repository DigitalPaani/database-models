"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const formulaConst_1 = require("../constants/formulaConst");
const frequencySchema = new mongoose_1.Schema({
    dateTime: {
        type: Number,
        required: false,
    },
    sensorId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
    },
    timeInMinutes: {
        type: Number,
        required: true,
    },
});
const formulasSchema = new mongoose_1.Schema({
    version: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose_1.Types.ObjectId, ref: "NewUser", required: true },
    plantId: { type: mongoose_1.Types.ObjectId, ref: "Plant", required: false },
    unit: { type: String, required: true, enum: formulaConst_1.FORMULA_UNITS },
    userGroupId: {
        type: mongoose_1.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
    workspaceId: {
        type: mongoose_1.Types.ObjectId,
        ref: "NewWorkspace",
        required: true,
    },
    formulaTag: { type: String, required: true },
    formulaChips: { type: [String], required: true },
    applyToHistoricalData: { type: Boolean, required: true },
    variableList: { type: [String], required: true },
    isArchived: { type: Boolean, required: true, default: false },
    frequency: { type: frequencySchema, required: false },
    type: { type: String, enum: formulaConst_1.FORMULA_TYPES, required: false },
    nextCalculationTime: {
        type: Number,
        required: true,
        default: Date.now() + 1000 * 60,
    },
    sensorSettingIds: { type: [mongoose_1.Types.ObjectId], ref: "SensorSettings" }, // Reference the `sensors` model
}, {
    timestamps: true,
});
const FormulasModel = mongoose_1.default.model("formulas", formulasSchema, "formulas");
exports.FormulasModel = FormulasModel;
