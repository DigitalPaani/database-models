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
exports.SensorRegistryModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const QuantitySchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    unit: { type: String, required: true },
}, { _id: false });
const DriftQuantitySchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    per: { type: String, required: false },
}, { _id: false });
const StuckToleranceSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    type: { type: String, enum: ["FIXED", "FSR"], required: true },
}, { _id: false });
const DataSheetSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    comments: { type: String, required: false },
}, { _id: false });
const TemplateTagSchema = new mongoose_1.Schema({
    tag: {
        type: String,
        required: true,
    },
    name: {
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
    isThresholdConfigured: { type: Boolean, required: false, default: false },
    frequency: { type: QuantitySchema, required: false },
    precision: { type: QuantitySchema, required: false },
    resolution: { type: QuantitySchema, required: false },
    drift: { type: DriftQuantitySchema, required: false },
    detectionLimit: { type: QuantitySchema, required: false },
    t90ResponseTime: { type: QuantitySchema, required: false },
    stuckWindowTime: { type: QuantitySchema, required: false },
    stuckTolerance: { type: StuckToleranceSchema, required: false },
    stuckMinThreshold: { type: Number },
    stuckMaxThreshold: { type: Number },
    dataSheets: { type: [DataSheetSchema], required: false },
}, { _id: false });
const SensorRegistrySchema = new mongoose_1.Schema({
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "company",
    },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true },
    purposeTags: {
        type: [TemplateTagSchema],
        default: [],
        required: false,
    },
}, { timestamps: true });
const SensorRegistryModel = mongoose_1.default.model("SensorRegistry", SensorRegistrySchema, "sensorRegistries");
exports.SensorRegistryModel = SensorRegistryModel;
