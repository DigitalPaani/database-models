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
exports.GeneralCommunicationModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Sender Schema
const senderSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["USER", "DOCTOR_PAANI"],
        required: true,
    },
    interactionContext: {
        type: String,
        enum: ["USER", "BIDIRECTIONAL", "INSIGHTS", "INGESTION"],
        required: false,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: false,
    },
}, { _id: false });
const attachmentSchema = new mongoose_1.Schema({
    filename: {
        type: String
    },
    url: {
        type: String
    }
});
// Receiver Schema
const receiverSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
}, { _id: false });
// Content Schema
const contentSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        enum: ["WHATSAPP", "SMS", "CALL", "EMAIL"],
        required: true,
    },
}, { _id: false });
// Main Schema (Composed)
const generalCommunicationSchema = new mongoose_1.Schema({
    sender: senderSchema,
    receiver: receiverSchema,
    content: contentSchema,
    deliveryStatus: {
        type: String,
        enum: ["NOT_AVAILABLE", "ACCEPTED", "SCHEDULED", "CANCELED", "QUEUED", "SENDING", "SENT", "FAILED", "DELIVERED", "UNDELIVERED", "RECEIVING", "READ"],
        default: "NOT_AVAILABLE",
    },
    isMultipleConversations: {
        type: Boolean,
        default: false,
    },
    multipleConversationPartner: {
        type: String,
        enum: ["BIDIRECTIONAL"],
        required: false
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["READ", "UNREAD"],
        default: "UNREAD",
    },
    errorDetails: {
        type: String,
        default: null,
    },
    tags: {
        type: [String],
        enum: ["REPORT"],
        default: [],
    },
    meta: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    attachments: {
        type: [attachmentSchema],
        default: [],
    },
    viewedAt: {
        type: Date,
        default: null
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const GeneralCommunicationModel = mongoose_1.default.model("generalCommunication", generalCommunicationSchema, "generalCommunication");
exports.GeneralCommunicationModel = GeneralCommunicationModel;
