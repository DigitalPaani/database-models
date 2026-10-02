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
const DIGEST_RETENTION_SECONDS = (30 * closeTheLoop_constants_1.DAY_MS) / 1000;
const ctlDigestItemSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", required: true },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    issueId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    generation: { type: Number, required: true, default: 0 },
    step: { type: String, enum: [...closeTheLoop_constants_1.LADDER_STEPS], required: true },
    severity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true },
    kind: { type: String, enum: [...closeTheLoop_constants_1.DIGEST_ITEM_KINDS], required: true },
    dedupKey: { type: String, required: true },
    digestDateKey: { type: String, required: true },
    title: { type: String, required: true, default: "" },
    sentAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });
ctlDigestItemSchema.index({ dedupKey: 1 }, { unique: true });
ctlDigestItemSchema.index({ sentAt: 1, userId: 1, digestDateKey: 1 });
ctlDigestItemSchema.index({ userId: 1, createdAt: -1 });
ctlDigestItemSchema.index({ createdAt: 1 }, { expireAfterSeconds: DIGEST_RETENTION_SECONDS });
const CtlDigestItemModel = mongoose_1.default.model("CtlDigestItem", ctlDigestItemSchema, "ctlDigestItems");
exports.default = CtlDigestItemModel;
