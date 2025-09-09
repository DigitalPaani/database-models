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
exports.BatchComponentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const batch_constants_1 = __importDefault(require("../constants/batch.constants"));
const BATCH_DURATION_UNIT_ALLOWED = [...Object.values(batch_constants_1.default.BATCH_DURATION_UNIT)];
const BATCH_STATUS_ALLOWED = [
    ...Object.values(batch_constants_1.default.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
    ...Object.values(batch_constants_1.default.BATCH_DETECTION_ENUM),
];
const BATCH_TYPE_ALLOWED = [...Object.values(batch_constants_1.default.BATCH_TYPE_ENUM)];
const WATER_TREATMENT_UNIT_ALLOWED = [
    ...Object.values(batch_constants_1.default.WATER_TREATMENT_UNIT_ENUM),
];
const BATCH_ACTION_ALLOWED = [...Object.values(batch_constants_1.default.BATCH_ACTION_ENUM)];
const batchStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: BATCH_STATUS_ALLOWED,
        required: true,
    },
    eventComponent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "event-components",
        required: true,
    },
    action: {
        type: String,
        enum: BATCH_ACTION_ALLOWED,
        required: true,
    },
});
const timeCycleRecurrenceSchema = new mongoose_1.Schema({
    frequency: { type: String, required: true },
    interval: { type: Number, required: true },
    daysOfWeek: { type: [Number], default: [] },
    dayOfMonth: { type: [Number], default: [] },
    weekOfMonth: { type: [Number], default: [] },
    hours: {
        type: [Number],
        validate: {
            validator: function (values) {
                return values.every((v) => v >= 0 && v <= 23);
            },
            message: "Hours should be between 0 and 23.",
        },
        default: [],
    },
    minutes: {
        type: [Number],
        validate: {
            validator: function (values) {
                return values.every((v) => v >= 0 && v <= 59);
            },
            message: "Minutes should be between 0 and 59.",
        },
        default: [],
    },
}, { _id: false });
const timeCycleSchema = new mongoose_1.Schema({
    recurrence: { type: timeCycleRecurrenceSchema, required: true },
    startDate: { type: Number, required: true },
    durationNumber: { type: Number, required: true },
    durationUnit: { type: String, enum: BATCH_DURATION_UNIT_ALLOWED, required: true },
});
const waterTreatmentSchema = new mongoose_1.Schema({
    unit: { type: String, enum: WATER_TREATMENT_UNIT_ALLOWED },
    value: { type: Number },
});
// Flow Node Position Schema
const nodePositionSchema = new mongoose_1.Schema({
    x: { type: Number, required: false },
    y: { type: Number, required: false },
}, { _id: false });
// Flow Node Data Schema
const nodeDataSchema = new mongoose_1.Schema({
    label: { type: String, required: false },
    equipmentId: { type: String, required: false },
}, { _id: false });
// Flow Node Schema
const flowNodeSchema = new mongoose_1.Schema({
    id: { type: String, required: false },
    type: { type: String, required: false },
    position: { type: nodePositionSchema, required: false },
    data: { type: nodeDataSchema, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    selected: { type: Boolean, default: false },
    positionAbsolute: { type: nodePositionSchema, required: false },
    dragging: { type: Boolean, default: false },
}, { _id: false });
// Flow Edge Style Schema
const edgeStyleSchema = new mongoose_1.Schema({
    stroke: { type: String, required: false },
    strokeWidth: { type: Number, required: false },
    cursor: { type: String, required: false },
}, { _id: false });
// Flow Edge Marker Schema
const edgeMarkerSchema = new mongoose_1.Schema({
    type: { type: String, required: false },
    width: { type: Number, required: false },
    height: { type: Number, required: false },
    color: { type: String, required: false },
}, { _id: false });
// Flow Edge Schema
const flowEdgeSchema = new mongoose_1.Schema({
    id: { type: String, required: false },
    source: { type: String, required: false },
    target: { type: String, required: false },
    sourceHandle: { type: String, required: false },
    targetHandle: { type: String, required: false },
    type: { type: String, required: false },
    animated: { type: Boolean, default: false },
    style: { type: edgeStyleSchema, required: false },
    markerEnd: { type: edgeMarkerSchema, required: false },
}, { _id: false });
const batchComponentSchema = new mongoose_1.Schema({
    assetId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    name: { type: String, required: true },
    equipments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "LayoutEquipments",
        required: true,
    },
    detectionType: {
        type: String,
        enum: BATCH_DETECTION_ALLOWED,
        required: true,
    },
    startBatchAction: {
        type: String,
        enum: BATCH_ACTION_ALLOWED,
        // default: BATCH_ACTION_ALLOWED.END
    },
    startBatchEventComponentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "event-components",
        required: false,
    },
    timeCycle: {
        type: timeCycleSchema,
        required: false,
    },
    trackingSensors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "sensors" }],
    flow: {
        nodes: { type: [flowNodeSchema], default: [] },
        edges: { type: [flowEdgeSchema], default: [] },
    },
    chemicalUsage: {
        type: [
            {
                itemId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "StoreItems",
                    required: true,
                },
                name: { type: String, required: true },
            },
        ],
        required: false,
    },
    waterTreatment: { type: waterTreatmentSchema },
    type: {
        type: String,
        enum: BATCH_TYPE_ALLOWED,
        default: "Regular",
    },
    purpose: { type: String, default: "" },
    startTriggerId: { type: mongoose_1.Types.ObjectId, ref: "triggers", required: false },
    endTriggerId: { type: mongoose_1.Types.ObjectId, ref: "triggers", required: false },
    statusConditions: {
        type: [batchStatusSchema],
    },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: mongoose_1.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose_1.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
});
const BatchComponentModel = mongoose_1.default.model("batch-components", batchComponentSchema, "batch-components");
exports.BatchComponentModel = BatchComponentModel;
