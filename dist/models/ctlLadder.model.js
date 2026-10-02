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
exports.LADDER_STATUSES = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
exports.LADDER_STATUSES = ["OPEN", "CLOSED"];
const readingSchema = new mongoose_1.Schema({
    value: { type: Number, required: true },
    unit: { type: String, default: "" },
    band: { type: String, default: null },
    trend: { type: String, enum: [...closeTheLoop_constants_1.READING_TRENDS, null], default: null },
}, { _id: false });
const ctlLadderSchema = new mongoose_1.Schema({
    issueId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    title: { type: String, required: true, default: "" },
    // Not required: Mongoose refuses '' for a required string, and a plant with no name
    // on the platform reads back as '' — every open at that plant would fail.
    plantName: { type: String, default: "" },
    severity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true },
    peakSeverity: { type: String, enum: [...closeTheLoop_constants_1.SEVERITIES], required: true },
    openedAt: { type: Date, required: true },
    anchorAt: { type: Date, required: true },
    generation: { type: Number, required: true, default: 1 },
    currentStep: {
        type: String,
        enum: [...closeTheLoop_constants_1.LADDER_STEPS],
        required: true,
        default: "OPENED",
    },
    status: {
        type: String,
        enum: [...exports.LADDER_STATUSES],
        required: true,
        default: "OPEN",
    },
    startedAt: { type: Date, default: null },
    startedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", default: null },
    handoffs: { type: [Date], required: true, default: [] },
    closedAt: { type: Date, default: null },
    lastAlertAt: { type: Date, default: null },
    lastAlertSeverity: {
        type: String,
        enum: [...closeTheLoop_constants_1.SEVERITIES, null],
        default: null,
    },
    hooterFiredAt: { type: Date, default: null },
    hooterSilencedAt: { type: Date, default: null },
    hooterSilencedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        default: null,
    },
    area: { type: String, default: null },
    equipment: { type: String, default: null },
    reading: { type: readingSchema, default: null },
    closedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", default: null },
    suppressedAlerts: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});
ctlLadderSchema.index({ issueId: 1 }, { unique: true, partialFilterExpression: { status: "OPEN" } });
ctlLadderSchema.index({ issueId: 1, createdAt: -1 });
const CtlLadderModel = mongoose_1.default.model("CtlLadder", ctlLadderSchema, "ctlLadders");
exports.default = CtlLadderModel;
