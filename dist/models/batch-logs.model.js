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
const BATCH_STATUS_ALLOWED = [
    ...Object.values(batch_constants_1.default.BATCH_STATUS_ENUM),
];
const BATCH_DETECTION_ALLOWED = [
    ...Object.values(batch_constants_1.default.BATCH_DETECTION_ENUM),
];
const batchLogSchema = new mongoose_1.Schema({
    batchComponentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "batch-components",
        required: true,
    },
    startTime: {
        type: Number,
        required: true,
    },
    endTime: {
        type: Number,
    },
    duration: {
        type: Number,
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
    initiatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "triggers",
        required: false,
    },
    eventComponentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "event-components",
    },
}, {
    timestamps: true,
});
batchLogSchema.index({ batchConfigId: 1, startTime: -1 });
batchLogSchema.index({ startTime: -1 });
const BatchLogModel = mongoose_1.default.model("batch-logs", batchLogSchema, "batch-logs");
exports.BatchLogModel = BatchLogModel;
