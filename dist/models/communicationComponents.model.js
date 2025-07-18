"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationComponentsModel = void 0;
const mongoose_1 = require("mongoose");
const triggerConst_1 = require("../constants/triggerConst");
const mongoose_2 = require("mongoose");
const commonConstants_1 = __importDefault(require("../constants/commonConstants"));
require("./userGroupModel");
require("./plantModel");
// Define the embedded schema for the message body
const communicationComponentsSchema = new mongoose_1.Schema({
    name: { type: String },
    userIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: "NewUser" },
    emailSubject: { type: String }, // Only for EMAIL type
    message: { type: String },
    messageType: { type: String, enum: ["TEXT", "HTML"] },
    attachments: [
        {
            name: String,
            link: String,
            filetype: String,
            isReport: { type: Boolean, default: false },
        },
    ],
    contentTemplateSid: { type: String }, // Only for WHATSAPP type
    contentTemplateVariables: {
        // Only for WHATSAPP type
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    type: {
        type: String,
        enum: Object.values(triggerConst_1.COMMUNICATION_COMPONENT_TYPES),
        required: true,
    },
    userGroup: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserGroup" },
    assetIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Plant" },
    messageFormat: { type: String },
    dashboardPageDetails: {
        name: String,
        pageId: mongoose_2.Types.ObjectId,
        format: String,
    },
    reportSelection: { type: Boolean },
    issueSelection: { type: Boolean },
    taskSelection: { type: Boolean },
    issueRange: { time: Number, unit: String, required: Boolean },
    taskRange: { time: Number, unit: String, required: Boolean },
    taskFilter: {
        type: String,
        enum: Object.values(commonConstants_1.default.TASK_OR_ISSUE_FILTERS),
    },
    taskLimit: { type: Number },
    issueFilter: {
        type: String,
        enum: Object.values(commonConstants_1.default.TASK_OR_ISSUE_FILTERS),
    },
    issueLimit: { type: Number },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, strict: false });
const CommunicationComponentsModel = (0, mongoose_1.model)("communicationComponents", communicationComponentsSchema, "communicationComponents");
exports.CommunicationComponentsModel = CommunicationComponentsModel;
