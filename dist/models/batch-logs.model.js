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
exports.BatchLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const batch_constants_1 = __importDefault(require("../constants/batch.constants"));
// Accept both enum KEYS and VALUES
const BATCH_STATUS_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_STATUS_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_DETECTION_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_DETECTION_ENUM),
];
const BATCH_TRIGGERED_BY_ALLOWED = [
    ...Object.keys(batch_constants_1.default.BATCH_TRIGGERED_BY_ENUM),
    ...Object.values(batch_constants_1.default.BATCH_TRIGGERED_BY_ENUM),
];
const batchLogSchema = new mongoose_1.Schema({
    batchConfigId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "batch-configs",
        required: true,
    },
    startTime: {
        type: Number, // Unix timestamp
        required: false,
    },
    endTime: {
        type: Number, // Unix timestamp
    },
    duration: {
        type: Number, // Duration in seconds
    },
    status: {
        type: String,
        enum: BATCH_STATUS_ALLOWED,
        required: false,
    },
    previousStatus: {
        type: String,
        enum: BATCH_STATUS_ALLOWED,
    },
    detectionType: {
        type: String,
        enum: BATCH_DETECTION_ALLOWED,
        required: false,
    },
    triggeredBy: {
        type: String,
        enum: BATCH_TRIGGERED_BY_ALLOWED,
        required: false,
    },
    triggeredEventId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "event-components",
    },
    triggeredTimeCycle: {
        frequency: { type: String },
        interval: { type: Number },
        startDate: { type: Number }, // Unix timestamp
    },
    hasErrors: {
        type: Boolean,
        default: false,
    },
    errorCount: {
        type: Number,
        default: 0,
    },
    lastErrorTime: {
        type: Number, // Unix timestamp
    },
    concurrentBatchIds: {
        type: [String],
        default: [],
    },
    insightIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "insights",
        default: [],
    },
    taskIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "tasks",
        default: [],
    },
    plantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plant",
        required: false,
    },
    assetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plant",
        required: false,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Indexes for efficient querying
batchLogSchema.index({ batchConfigId: 1, startTime: -1 });
batchLogSchema.index({ plantId: 1, status: 1 });
batchLogSchema.index({ startTime: -1 });
batchLogSchema.index({ assetId: 1, startTime: -1 });
const BatchLogModel = mongoose_1.default.model("batch-logs", batchLogSchema, "batch-logs");
exports.BatchLogModel = BatchLogModel;
