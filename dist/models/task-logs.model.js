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
exports.TaskLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("./newUserModel");
const transitionSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});
const taskLogSchema = new mongoose_1.Schema({
    taskId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    transitionFrom: {
        type: transitionSchema,
        required: true,
    },
    transitionTo: {
        type: transitionSchema,
        required: true,
    },
    url: {
        type: String,
        default: "",
    },
    filename: {
        type: String,
        default: null,
    },
    mimetype: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ["RCA", "MEDIA", "COMMUNICATION", "CREATE_SUB_TASK", "ASSIGN_TO_A_DIFFERENT_USER"],
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
}, {
    timestamps: true,
    minimize: false,
});
const TaskLogModel = mongoose_1.default.model("task-logs", taskLogSchema, "task-logs");
exports.TaskLogModel = TaskLogModel;
