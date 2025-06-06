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
exports.AttachmentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const attachmentSchema = new mongoose_1.Schema({
    attachmentLink: {
        type: String,
        required: false,
    },
    filename: {
        type: String,
        required: false,
    },
    mimetype: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ["TASK_TEMPLATE", "INSIGHT_TEMPLATE", "MANUAL_INSIGHT"],
    },
    expireAt: {
        type: Date,
        required: false, // If we don't want the document to expire, we can set it to null
    },
}, {
    timestamps: true,
    minimize: false,
});
// Expire documents after 1 Day
attachmentSchema.index({ expireAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });
const AttachmentModel = mongoose_1.default.model("attachments", attachmentSchema, "attachments");
exports.AttachmentModel = AttachmentModel;
