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
exports.InsightsTemplateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const insights_constants_1 = require("../constants/insights.constants");
const insightsTemplateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    equipmentTypes: {
        type: [String],
        enums: insights_constants_1.EQUIPMENT_TYPES,
    },
    insightClassification: {
        type: String,
        enums: insights_constants_1.TYPES_OF_INSIGHT_CLASSIFICATIONS,
    },
    insightType: {
        type: String,
        enums: insights_constants_1.TYPES_OF_INSIGHTS,
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
    rcaEnabled: {
        type: Boolean,
        default: false,
    },
    rcaContent: {
        type: String,
        default: "",
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    minimize: false,
});
const InsightsTemplateModel = mongoose_1.default.model("insights-templates", insightsTemplateSchema, "insights-templates");
exports.InsightsTemplateModel = InsightsTemplateModel;
