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
exports.NotificationComponentsModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const NotificationSchema = new mongoose_1.Schema({
    eventType: { type: String, required: true },
    eventMessage: { type: String, required: true },
    iconUrl: { type: String },
    iconId: { type: String },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", default: null },
    usergroupId: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserGroup" },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    timestamp: { type: Number, default: 0 },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
    },
    viewedAt: { type: Date, default: null },
    flag: { type: Boolean, default: false },
    uriPath: { type: String },
    module: { type: mongoose_1.Schema.Types.Mixed },
    escalation: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    templatedId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Template" },
    triggerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Trigger" },
    type: { type: String },
}, { timestamps: true });
const NotificationComponentsModel = mongoose_1.default.model("notificationComponents", NotificationSchema, "notificationComponents");
exports.NotificationComponentsModel = NotificationComponentsModel;
