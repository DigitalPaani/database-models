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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchConfigModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const batch_constants_1 = __importDefault(require("../constants/batch.constants"));
// Accept both enum KEYS (e.g., "PLANNED") and VALUES (e.g., "Planned")
const BATCH_STATUS_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_STATUS_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_DETECTION_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_DETECTION_ENUM),
];
const BATCH_TYPE_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_TYPE_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_TYPE_ENUM),
];
const WATER_TREATMENT_UNIT_ALLOWED = [
    ...Object.keys(batch_constants_1.default.WATER_TREATMENT_UNIT_ENUM),
    ...Object.values(batch_constants_1.default.WATER_TREATMENT_UNIT_ENUM),
];
const batchStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: BATCH_STATUS_ALLOWED,
        required: true,
    },
    event: { type: mongoose_1.Schema.Types.ObjectId, ref: "event-components", required: true },
    eventTag: { type: mongoose_1.Schema.Types.ObjectId, ref: "sensors" },
});
// Time cycle schema for detection logic
const timeCycleRecurrenceSchema = new mongoose_1.Schema({
    frequency: { type: String, required: true },
    interval: { type: Number, required: true },
    daysOfWeek: { type: [Number], default: [] },
    dayOfMonth: { type: [Number], default: [] },
    weekOfMonth: { type: [Number], default: [] },
    month: { type: [Number], default: [] },
}, { _id: false });
const timeCycleSchema = new mongoose_1.Schema({
    recurrence: { type: timeCycleRecurrenceSchema, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    totalOccurrence: { type: Number },
}, { _id: false });
// Water treatment sub-schema (used for alias mapping)
const waterTreatmentSchema = new mongoose_1.Schema({
    unit: { type: String, enum: WATER_TREATMENT_UNIT_ALLOWED },
    value: { type: Number, }
}, { _id: false });
const batchConfigSchema = new mongoose_1.Schema({
    assetId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    batchName: { type: String, required: true, alias: "name" },
    batchEquipments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'LayoutEquipments',
        required: true,
        alias: 'selectedEquipments',
    },
    detectionLogic: {
        primary: {
            type: String,
            enum: BATCH_DETECTION_ALLOWED,
            required: true,
            alias: 'detectionType',
        },
        selectedEvent: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "event-components",
            required: false,
        },
        timeCycle: {
            type: timeCycleSchema,
            required: false,
        },
    },
    trackingSensors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "sensors" }],
    batchFlow: {
        nodes: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
        edges: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    },
    chemicalUsage: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    waterTreatment: { type: waterTreatmentSchema, alias: 'waterTreatmentUnit' },
    batchType: {
        type: String,
        enum: BATCH_TYPE_ALLOWED,
        default: "Regular",
    },
    batchPurpose: { type: String, default: "", alias: "purpose" },
    statusConditions: { type: [batchStatusSchema], alias: 'attachedConditions' },
    createdBy: { type: mongoose_1.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose_1.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
});
const BatchConfigModel = mongoose_1.default.model("batch-configs", batchConfigSchema, "batch-configs");
exports.BatchConfigModel = BatchConfigModel;
