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
exports.TriggerComponentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const triggerConst_1 = require("../constants/triggerConst");
const workflowActionSchema = new mongoose_1.default.Schema({
    communication: { type: String, default: "" },
    users: [
        {
            id: { type: mongoose_1.default.Schema.Types.ObjectId },
            name: { type: String },
        },
    ],
    action: { type: String },
    nodeName: { type: String },
}, { _id: false, strict: false });
const escalationSchema = new mongoose_1.default.Schema({
    unit: { type: String },
    value: { type: String },
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId }],
    channel: { type: String },
}, { _id: false, strict: false });
const taskDataSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
}, { _id: false, strict: false });
const triggerComponentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: Object.values(triggerConst_1.TRIGGER_COMPONENT_TYPES),
        required: true,
        trim: true,
    },
    taskData: { type: taskDataSchema },
    asset: { type: mongoose_1.default.Schema.Types.ObjectId },
    assignMethod: { type: String },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
    expectedTime: { type: String },
    expectedUnit: { type: String },
    deadlineTime: { type: String },
    deadlineUnit: { type: String },
    dataInputTag: { type: String },
    escalations: [escalationSchema],
    workflowActions: [workflowActionSchema],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, strict: false });
const TriggerComponentModel = mongoose_1.default.model("triggerComponents", triggerComponentSchema, "triggerComponents");
exports.TriggerComponentModel = TriggerComponentModel;
