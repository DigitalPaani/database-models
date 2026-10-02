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
const mongoose_1 = __importStar(require("mongoose"));
const closeTheLoop_constants_1 = require("../constants/closeTheLoop.constants");
const ctlUserNotificationSetting_model_1 = require("./ctlUserNotificationSetting.model");
const ctlPlantNotificationConfigSchema = new mongoose_1.Schema({
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plant", required: true },
    hooterEnabled: { type: Boolean, required: true, default: false },
    hooterDurationSec: {
        type: Number,
        required: true,
        default: closeTheLoop_constants_1.HOOTER_DEFAULT_DURATION_SEC,
        min: closeTheLoop_constants_1.HOOTER_DURATIONS.minSec,
        max: closeTheLoop_constants_1.HOOTER_DURATIONS.maxSec,
    },
    quietHours: {
        type: ctlUserNotificationSetting_model_1.quietWindowSchema,
        required: true,
        default: () => ({ ...closeTheLoop_constants_1.DEFAULT_QUIET_HOURS }),
    },
    quietHoursEnabled: { type: Boolean, required: true, default: true },
    // Every language until the admin narrows the list (offeredLanguages), so a plant
    // that only saved its hooter never moves its people to English.
    languages: {
        type: [String],
        enum: [...closeTheLoop_constants_1.LANGUAGES],
        required: true,
        default: () => [...closeTheLoop_constants_1.LANGUAGES],
    },
    defaultLanguage: {
        type: String,
        enum: [...closeTheLoop_constants_1.LANGUAGES],
        required: true,
        default: closeTheLoop_constants_1.DEFAULT_LANGUAGE,
    },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "NewUser", default: null },
}, { timestamps: true });
ctlPlantNotificationConfigSchema.index({ plantId: 1 }, { unique: true });
const CtlPlantNotificationConfigModel = mongoose_1.default.model("CtlPlantNotificationConfig", ctlPlantNotificationConfigSchema, "ctlPlantNotificationConfigs");
exports.default = CtlPlantNotificationConfigModel;
