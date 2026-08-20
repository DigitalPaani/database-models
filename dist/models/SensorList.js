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
exports.SensorModel = exports.TemplateTagSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const sensorConst_1 = require("../constants/sensorConst");
const ValueUnitSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    unit: { type: String, required: true },
}, { _id: false });
const DriftSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    per: { type: String, required: false },
}, { _id: false });
const StuckToleranceSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    type: { type: String, enum: ["FIXED", "FSR"], required: false },
}, { _id: false });
const DataSheetSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    comments: { type: String, required: false },
}, { _id: false });
exports.TemplateTagSchema = new mongoose_1.Schema({
    tag: {
        type: String,
        required: true,
    },
    validMin: { type: Number, required: false },
    validMax: { type: Number, required: false },
    cautionMin: { type: Number, required: false },
    cautionMax: { type: Number, required: false },
    safeMin: { type: Number, required: false },
    safeMax: { type: Number, required: false },
    showCautionZone: { type: Boolean, required: false },
    frequency: { type: ValueUnitSchema, required: false },
    stuckWindowTime: { type: ValueUnitSchema, required: false },
    precision: { type: ValueUnitSchema, required: false },
    resolution: { type: ValueUnitSchema, required: false },
    drift: { type: DriftSchema, required: false },
    detectionLimit: { type: ValueUnitSchema, required: false },
    t90ResponseTime: { type: ValueUnitSchema, required: false },
    stuckTolerance: { type: StuckToleranceSchema, required: false },
    dataSheets: { type: [DataSheetSchema], required: false, default: [] },
    isThresholdConfigured: { type: Boolean, required: false, default: false },
}, { _id: false });
const SensorSchema = new mongoose_1.Schema({
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "company",
    },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true },
    purpose: { type: [String] },
    inputType: {
        type: [String],
        enum: sensorConst_1.sensorInputType, // Restricts values to these three options
    },
    tags: { type: [String], default: [] },
    templateTags: {
        type: [exports.TemplateTagSchema],
        default: [],
        required: false
    },
}, { timestamps: true });
const SensorModel = mongoose_1.default.model("SensorList", SensorSchema, "SensorLists");
exports.SensorModel = SensorModel;
