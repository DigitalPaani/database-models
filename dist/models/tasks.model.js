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
exports.TaskModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require('./newUserModel');
const taskManagementConst_1 = require("../constants/taskManagementConst");
const workflowDetailsSchema = new mongoose_1.Schema({
    workflowId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'workflows',
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    nodes: {
        type: [Object],
        required: false,
    },
    edges: {
        type: [Object],
        required: false,
    },
    transitionStatus: {
        type: String,
        required: false,
    },
}, { _id: false });
const escalationSchema = new mongoose_1.Schema({
    timeInMinutes: {
        type: Number,
        required: false,
    },
    communicationMedium: {
        type: String,
        enum: taskManagementConst_1.communicationMediumEnums,
        required: false,
    },
    userIds: {
        type: [mongoose_1.Types.ObjectId],
        ref: "NewUser",
        required: false,
    },
    isNotified: { type: Boolean, default: false },
}, { _id: false });
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
    },
    actionIds: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: false
    }
}, { _id: false });
const componentActionSchema = new mongoose_1.Schema({
    nodeId: {
        type: String,
        required: false,
    },
    actionNodes: {
        type: [actionNodeSchema],
        required: false
    }
}, { _id: false });
const taskSchema = new mongoose_1.Schema({
    triggerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    taskTemplateId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    scope: {
        type: String,
        enum: ['SYSTEM', 'USER_GROUP'],
        required: true,
    },
    userGroupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
    },
    workspaceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    assetId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Plant",
        required: false,
    },
    assignee: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    workflowDetails: {
        type: workflowDetailsSchema,
        required: false
    },
    name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    trainingVideoId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    attachmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'attachments',
        required: false,
    },
    priority: {
        type: String,
        required: false,
    },
    taskType: {
        type: String,
        required: false,
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
    taskCompletionTime: {
        type: Number,
        required: false,
    },
    equipmentSelected: {
        type: String,
        required: false,
    },
    skillsSelected: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'skill-managements',
        required: false,
    },
    dataEntry: {
        type: Boolean,
        default: false,
        required: false,
    },
    sensorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false
    },
    richTextContent: {
        type: String,
        required: false,
    },
    escalations: {
        type: [escalationSchema],
        required: false,
    },
    componentActions: {
        type: [componentActionSchema],
        required: false,
    },
    isObsolete: {
        type: Boolean,
        default: false
    },
    taskComponentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    taskCompleted: {
        type: Boolean,
        required: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {
    timestamps: true,
    minimize: false
});
const TaskModel = mongoose_1.default.model('tasks', taskSchema, 'tasks');
exports.TaskModel = TaskModel;
