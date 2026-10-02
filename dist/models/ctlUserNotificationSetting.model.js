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
exports.quietWindowSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
const modeField = {
    type: String,
    enum: [...closeTheLoop_constants_1.DELIVERY_MODES],
    required: true,
};
const modesSchema = new mongoose_1.Schema({
    EMERGENCY: modeField,
    MAJOR: modeField,
    MINOR: modeField,
    CAUTION: modeField,
}, { _id: false });
exports.quietWindowSchema = new mongoose_1.Schema({
    startMinute: { type: Number, required: true, min: 0, max: 1439 },
    endMinute: { type: Number, required: true, min: 0, max: 1439 },
}, { _id: false });
const ctlUserNotificationSettingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", required: true },
    roleKey: { type: String, required: true },
    modes: { type: modesSchema, required: true },
    quietHours: { type: exports.quietWindowSchema, default: null },
    quietHoursEnabled: { type: Boolean, required: true, default: true },
    realtimeChannel: {
        type: String,
        enum: [...closeTheLoop_constants_1.REALTIME_CHANNELS],
        required: true,
        default: "WHATSAPP",
    },
    handoffAlerts: { type: Boolean, required: true, default: true },
    pushPromptedAt: { type: Date, default: null },
}, { timestamps: true });
ctlUserNotificationSettingSchema.index({ userId: 1 }, { unique: true });
const CtlUserNotificationSettingModel = mongoose_1.default.model("CtlUserNotificationSetting", ctlUserNotificationSettingSchema, "ctlUserNotificationSettings");
exports.default = CtlUserNotificationSettingModel;
