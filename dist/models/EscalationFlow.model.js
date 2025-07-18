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
exports.EscalationFlowModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Sub-schema for each escalation step
const escalationStepSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    timeInMinutes: {
        type: Number,
        required: true,
    },
    userIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "NewUser",
            required: true,
        },
    ],
}, { _id: false });
// Main schema
const escalationFlowSchema = new mongoose_1.Schema({
    attendenceManager: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    rosterManager: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    operator: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    userGroup: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
    assets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    modules: {
        type: [String],
        default: [],
    },
    escalations: [escalationStepSchema],
}, { timestamps: true });
// Model
const EscalationFlowModel = mongoose_1.default.model("EscalationFlow", escalationFlowSchema, "escalationFlow");
exports.EscalationFlowModel = EscalationFlowModel;
