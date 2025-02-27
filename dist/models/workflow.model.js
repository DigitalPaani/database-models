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
exports.WorkflowModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const actionNodeSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    selectedAction: {
        type: String,
        required: false,
    },
    selectedActionValue: {
        type: String,
        required: false,
    }
});
const workflowActionSchema = new mongoose_1.Schema({
    nodeId: {
        type: String,
        required: false,
    },
    actionNodes: {
        type: [actionNodeSchema],
        required: false,
    },
});
const workflowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    scope: {
        type: String,
        enum: ['SYSTEM', 'USER_GROUP'],
        required: true,
    },
    userGroupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserGroup",
        default: null
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: true,
    },
    nodes: {
        type: [Object],
        required: true,
    },
    edges: {
        type: [Object],
        required: true,
    },
    workflowActions: {
        type: [workflowActionSchema],
        required: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
}, {
    minimize: false,
    timestamps: true,
});
const WorkflowModel = mongoose_1.default.model('workflows', workflowSchema, 'workflows');
exports.WorkflowModel = WorkflowModel;
