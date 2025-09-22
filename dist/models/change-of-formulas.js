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
exports.changeOfFormulaSchema = exports.changeOfFormulasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const formulaConst_1 = require("../constants/formulaConst");
require("./sensorModel");
require("./workspaceModel");
require("./newUserModel");
require("./plantModel");
require("./userGroupModel");
require("./sensorSettingModel");
const frequencySchema = new mongoose_1.Schema({
    dateTime: {
        type: Number,
        required: false,
    },
    sensorId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
        ref: "sensors",
    },
    timeInMinutes: {
        type: Number,
        required: true,
    },
});
const changeOfFormulaSchema = new mongoose_1.Schema({
    version: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.ObjectId, ref: "NewUser", required: true },
    plantId: { type: mongoose_1.Schema.ObjectId, ref: "Plant", required: false },
    unit: { type: String, required: true, enum: formulaConst_1.FORMULA_UNITS },
    formulaTag: { type: String, required: true },
    formulaChips: {
        type: [
            {
                value: { type: String, trim: true, required: true },
                type: { type: String, required: true, enum: formulaConst_1.FORMULAS_CHIP_TYPES },
                color: { type: String, trim: true, required: false },
                sensorSetting: {
                    type: mongoose_1.Types.ObjectId,
                    required: false,
                    ref: "SensorSettings",
                },
            },
        ],
        required: true,
    },
    isArchived: { type: Boolean, required: true, default: false },
    sensorSettingIds: { type: [mongoose_1.Schema.ObjectId], ref: "SensorSettings" }, // Reference the `sensors` model
    formulaSensorId: { type: mongoose_1.Schema.ObjectId, required: true, ref: "sensors" },
    parentFormulaId: { type: mongoose_1.Schema.ObjectId, required: false, ref: "formulaAudits" },
}, {
    timestamps: true,
});
exports.changeOfFormulaSchema = changeOfFormulaSchema;
const changeOfFormulasModel = mongoose_1.default.model("ChangeOfformulas", changeOfFormulaSchema, "ChangeOfformulas");
exports.changeOfFormulasModel = changeOfFormulasModel;
