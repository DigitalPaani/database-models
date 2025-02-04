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
exports.TaskTemplateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const taskManagementConst_1 = require("../constants/taskManagementConst");
const taskTemplateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    trainingVideoId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    attachmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "attachments",
        required: false,
    },
    priority: {
        type: String,
        required: true,
    },
    taskType: {
        type: String,
        required: true,
    },
    workflowId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    taskCompletion: {
        type: String,
        enum: taskManagementConst_1.taskCompletionEnums.map(taskCompletionEnum => taskCompletionEnum.value),
    },
    assigneeMethod: {
        type: String,
        enum: taskManagementConst_1.assigneeMethodEnums.map(assigneeMethodEnum => assigneeMethodEnum.value),
    },
    complexity: {
        type: Number,
        required: false,
    },
    taskDeadlineTime: {
        type: Number,
        required: false,
    },
    taskExpectedTime: {
        type: Number,
        required: false,
    },
    equipmentSelected: {
        type: String,
        required: false,
    },
    skillsSelected: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: false,
    },
    dataEntry: {
        type: Boolean,
        default: false,
        required: false,
    },
    sensorTag: {
        type: String,
        required: false,
    },
    richTextContent: {
        type: String,
        required: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
}, {
    timestamps: true,
});
const TaskTemplateModel = mongoose_1.default.model('task-templates', taskTemplateSchema, 'task-templates');
exports.TaskTemplateModel = TaskTemplateModel;
