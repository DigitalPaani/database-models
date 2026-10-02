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
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
const PUBLISHED_RETENTION_SECONDS = (7 * closeTheLoop_constants_1.DAY_MS) / 1000;
const DEAD_RETENTION_SECONDS = (30 * closeTheLoop_constants_1.DAY_MS) / 1000;
const ctlOutboxSchema = new mongoose_1.Schema({
    eventType: { type: String, required: true },
    aggregateId: { type: String, required: true },
    payload: { type: mongoose_1.Schema.Types.Mixed, required: true },
    occurredAt: { type: Date, required: true },
    nextAttemptAt: { type: Date, required: true },
    publishedAt: { type: Date, default: null },
    deadAt: { type: Date, default: null },
    attempts: { type: Number, required: true, default: 0 },
    lastError: { type: String, default: null },
}, {
    timestamps: false,
    minimize: false,
});
ctlOutboxSchema.index({ publishedAt: 1, deadAt: 1, nextAttemptAt: 1, _id: 1 });
ctlOutboxSchema.index({ publishedAt: 1 }, { expireAfterSeconds: PUBLISHED_RETENTION_SECONDS });
ctlOutboxSchema.index({ deadAt: 1 }, { expireAfterSeconds: DEAD_RETENTION_SECONDS });
const CtlOutboxModel = mongoose_1.default.model("CtlOutboxEvent", ctlOutboxSchema, "ctlOutbox");
exports.default = CtlOutboxModel;
