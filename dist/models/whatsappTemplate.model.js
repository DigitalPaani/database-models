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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappTemplateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const commonConstants_1 = __importDefault(require("../constants/commonConstants"));
;
;
const variableSchema = new mongoose_1.Schema({
    position: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        enum: Object.values(commonConstants_1.default.WHATSAPP_TEMPLATE_VARIABLES),
        default: ""
    },
    allowedInputs: {
        type: [String],
        enum: Object.values(commonConstants_1.default.WHATSAPP_TEMPLATE_ALLOWED_INPUTS),
        default: []
    }
});
const whatsappTemplateSchema = new mongoose_1.Schema({
    contentTemplateSid: {
        type: String,
        required: false,
    },
    templateName: {
        type: String,
        required: false,
    },
    templateContent: {
        type: String,
        required: false,
    },
    variables: {
        type: [variableSchema],
        required: false,
    },
    isReportConfigRequired: {
        type: Boolean,
        required: false,
    },
    isTaskConfigRequired: {
        type: Boolean,
        required: false,
    },
    isInsightConfigRequired: {
        type: Boolean,
        required: false,
    },
    isTriggerCommunicationConfigEnabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: false,
    }
}, {
    timestamps: true,
});
const WhatsappTemplateModel = mongoose_1.default.model('whatsappTemplates', whatsappTemplateSchema, 'whatsappTemplates');
exports.WhatsappTemplateModel = WhatsappTemplateModel;
