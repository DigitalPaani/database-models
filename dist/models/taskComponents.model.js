"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskComponentsModel = void 0;
const mongoose_1 = require("mongoose");
// Schema for each node inside workflowDetails.nodes
const WorkflowNodeSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
        x: { type: Number },
        y: { type: Number },
    },
    data: {
        type: { type: String },
        label: { type: String },
        selectedAction: { type: String },
        selectedActionValue: { type: String },
    },
    width: { type: Number },
    height: { type: Number },
    selected: { type: Boolean },
    positionAbsolute: {
        x: { type: Number },
        y: { type: Number },
    },
    dragging: { type: Boolean },
}, { _id: false });
// Schema for each edge inside workflowDetails.edges
const WorkflowEdgeSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    source: { type: String, required: true },
    sourceHandle: { type: String },
    target: { type: String, required: true },
    targetHandle: { type: String },
    type: { type: String },
    animated: { type: Boolean },
    data: {
        label: { type: String },
    },
    markerEnd: {
        type: { type: String },
        width: { type: Number },
        height: { type: Number },
        color: { type: String },
    },
    selected: { type: Boolean },
}, { _id: false });
// Schema for workflowDetails
const WorkflowDetailsSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    nodes: [WorkflowNodeSchema],
    edges: [WorkflowEdgeSchema],
}, { _id: false });
const ActionNodeSchema = new mongoose_1.Schema({
    id: { type: String },
    label: { type: String },
    selectedAction: { type: String },
    selectedActionValue: { type: String },
    actionIds: { type: [mongoose_1.Schema.Types.ObjectId] },
}, { _id: false });
// Schema for each entry in componentActions
const ComponentActionSchema = new mongoose_1.Schema({
    nodeId: { type: String },
    actionNodes: [ActionNodeSchema],
}, { _id: false });
// Schema for each escalation entry
const EscalationSchema = new mongoose_1.Schema({
    timeInMinutes: { type: String },
    communicationMedium: { type: String },
    userIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser" }],
}, { _id: false });
// Main Task Schema
const TaskComponentSchema = new mongoose_1.Schema({
    taskTemplateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "task-templates",
        required: true,
    },
    taskData: { taskTemplateId: mongoose_1.Schema.Types.ObjectId, name: String },
    assetId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant" },
    name: { type: String, required: true },
    description: { type: String },
    trainingVideoId: { type: String, default: "" },
    attachmentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "attachments" },
    priority: { type: String },
    taskType: { type: String },
    workflowId: { type: mongoose_1.Schema.Types.ObjectId, ref: "workflows" },
    workflowDetails: WorkflowDetailsSchema,
    taskCompletion: { type: String },
    assigneeMethod: { type: String },
    assignee: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser" },
    complexity: { type: Number },
    taskDeadlineTime: { type: Number },
    taskExpectedTime: { type: Number },
    skillsSelected: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "skill-managements" }],
    dataEntry: { type: Boolean },
    sensorTag: { type: String },
    richTextContent: { type: String },
    escalations: [EscalationSchema],
    componentActions: [ComponentActionSchema],
    parentId: { type: mongoose_1.Schema.Types.ObjectId },
    isSubtask: { type: Boolean, default: false },
    // frontend requirements
    TaskFormDataId: { type: String },
    parentIndex: { type: Number },
    parentAutocompleteId: { type: String },
    workflowActions: { type: [mongoose_1.Schema.Types.Mixed] },
}, { timestamps: true });
const TaskComponentsModel = (0, mongoose_1.model)("taskComponents", TaskComponentSchema, "taskComponents");
exports.TaskComponentsModel = TaskComponentsModel;
