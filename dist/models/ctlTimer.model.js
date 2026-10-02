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
exports.TIMER_STATUSES = exports.TIMER_KINDS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
exports.TIMER_KINDS = [
    "LADDER_STEP",
    "DIGEST",
    "SWEEP",
    "HOOTER_WATCHDOG",
];
exports.TIMER_STATUSES = [
    "PENDING",
    "CLAIMED",
    "DONE",
    "SKIPPED",
    "CANCELLED",
    "DEAD",
];
const TIMER_RETENTION_SECONDS = (7 * closeTheLoop_constants_1.DAY_MS) / 1000;
const ctlTimerSchema = new mongoose_1.Schema({
    kind: { type: String, enum: [...exports.TIMER_KINDS], required: true },
    ladderId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    issueId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    step: { type: String, enum: [...closeTheLoop_constants_1.LADDER_STEPS, null], default: null },
    generation: { type: Number, required: true, default: 0 },
    dueAt: { type: Date, required: true },
    status: {
        type: String,
        enum: [...exports.TIMER_STATUSES],
        required: true,
        default: "PENDING",
    },
    leaseUntil: { type: Date, default: null },
    claimedBy: { type: String, default: null },
    attempts: { type: Number, required: true, default: 0 },
    lastError: { type: String, default: null },
    completedAt: { type: Date, default: null },
    singletonKey: { type: String, default: null },
}, {
    timestamps: true,
});
ctlTimerSchema.index({ status: 1, dueAt: 1 });
ctlTimerSchema.index({ ladderId: 1, generation: 1, status: 1 });
ctlTimerSchema.index({ status: 1, leaseUntil: 1 }, { partialFilterExpression: { status: "CLAIMED" } });
ctlTimerSchema.index({ completedAt: 1 }, { expireAfterSeconds: TIMER_RETENTION_SECONDS });
ctlTimerSchema.index({ singletonKey: 1 }, {
    unique: true,
    partialFilterExpression: { singletonKey: { $type: "string" } },
});
const CtlTimerModel = mongoose_1.default.model("CtlTimer", ctlTimerSchema, "ctlTimers");
exports.default = CtlTimerModel;
