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
exports.InsightComponentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DYNAMIC_NAME_TYPE_ENUMS = ['EQUIPMENT'];
;
;
const dynamicNameValueSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: DYNAMIC_NAME_TYPE_ENUMS,
        required: true, // e.g., "EQUIPMENT"
    },
    key: {
        type: String,
        required: true, // e.g., "EQUIPMENT1"
    },
    value: {
        type: String,
        required: true,
    },
});
const insightComponentSchema = new mongoose_1.Schema({
    insightTemplateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "insights-templates",
        required: true,
    },
    triggerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    dynamicNameValues: {
        type: [dynamicNameValueSchema],
        default: []
    },
    insightClassification: {
        type: String,
        required: true,
    },
    insightType: {
        type: String,
        required: true,
    },
    attachmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "attachments",
        default: null,
    },
    richTextContent: {
        type: String,
        default: "",
    },
    userGroupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
    assetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
    },
    equipmentIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "LayoutEquipments",
        required: true,
    },
    priority: {
        type: Number,
        required: true,
    },
    startInsightSensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sensors",
        required: true,
    },
    rcaEnabled: {
        type: Boolean,
        default: false,
    },
    rcaContent: {
        type: String,
        default: "",
    },
    isTimeSensitive: {
        type: Boolean,
        default: false,
    },
    userIdsForTimeSensitive: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "NewUser",
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const InsightComponentModel = mongoose_1.default.model("insightComponents", insightComponentSchema, "insightComponents");
exports.InsightComponentModel = InsightComponentModel;
