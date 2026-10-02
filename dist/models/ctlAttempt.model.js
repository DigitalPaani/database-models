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
exports.ATTEMPT_KINDS = exports.ATTEMPT_STATUSES = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
exports.ATTEMPT_STATUSES = [
    "PENDING",
    "SENDING",
    "SENT",
    "FAILED",
    "DEAD",
    "ACKED",
    "UNACKED",
];
exports.ATTEMPT_KINDS = [
    "LADDER",
    "NAMED",
    "WATCHDOG",
    "COVERAGE",
    "DIGEST",
];
const ATTEMPT_RETENTION_SECONDS = (90 * closeTheLoop_constants_1.DAY_MS) / 1000;
const payloadSchema = new mongoose_1.Schema({
    to: { type: String, required: true },
    language: { type: String, enum: [...closeTheLoop_constants_1.LANGUAGES], required: true },
    templateKey: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String, default: null },
    emailSubject: { type: String, default: null },
    code: { type: String, required: true },
    durationSec: { type: Number, default: null },
}, { _id: false });
const ctlAttemptSchema = new mongoose_1.Schema({
    idempotencyKey: { type: String, required: true },
    kind: { type: String, enum: [...exports.ATTEMPT_KINDS], required: true },
    issueId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    ladderId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", default: null },
    channel: { type: String, enum: [...closeTheLoop_constants_1.CHANNELS], required: true },
    severity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true },
    step: { type: String, enum: [...closeTheLoop_constants_1.LADDER_STEPS], required: true },
    generation: { type: Number, required: true },
    reason: { type: String, enum: [...closeTheLoop_constants_1.ROUTE_REASONS], required: true },
    status: {
        type: String,
        enum: [...exports.ATTEMPT_STATUSES],
        required: true,
        default: "PENDING",
    },
    attempts: { type: Number, required: true, default: 0 },
    nextRetryAt: { type: Date, default: null },
    claimedAt: { type: Date, default: null },
    claimedBy: { type: String, default: null },
    providerRef: { type: String, default: null },
    lastError: { type: String, default: null },
    sentAt: { type: Date, default: null },
    ackDeadlineAt: { type: Date, default: null },
    ackedAt: { type: Date, default: null },
    payload: { type: payloadSchema, required: true },
}, {
    timestamps: true,
});
ctlAttemptSchema.index({ idempotencyKey: 1 }, { unique: true });
ctlAttemptSchema.index({ userId: 1, channel: 1, createdAt: -1 }, { partialFilterExpression: { channel: "IN_APP" } });
ctlAttemptSchema.index({ status: 1, nextRetryAt: 1 }, { partialFilterExpression: { status: "FAILED" } });
ctlAttemptSchema.index({ status: 1, claimedAt: 1 }, { partialFilterExpression: { status: "SENDING" } });
ctlAttemptSchema.index({ status: 1, createdAt: 1 }, { partialFilterExpression: { status: "PENDING" } });
ctlAttemptSchema.index({ status: 1, ackDeadlineAt: 1 }, { partialFilterExpression: { channel: "HOOTER" } });
ctlAttemptSchema.index({ createdAt: 1 }, { expireAfterSeconds: ATTEMPT_RETENTION_SECONDS });
// The Site Settings failed-messages count reads one plant's rows by time. A plain index, not a
// partial one: a partial filter with $in needs MongoDB 6.0+, and an older server skips the build silently.
ctlAttemptSchema.index({ plantId: 1, createdAt: -1 });
const CtlAttemptModel = mongoose_1.default.model("CtlAttempt", ctlAttemptSchema, "ctlAttempts");
exports.default = CtlAttemptModel;
