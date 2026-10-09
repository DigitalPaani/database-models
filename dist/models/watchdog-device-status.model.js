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
exports.DEVICE_STATUSES = exports.DeviceStatusModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const watchdog_event_model_1 = require("./watchdog-event.model");
const DEVICE_STATUSES = ["ONLINE", "OFFLINE"];
exports.DEVICE_STATUSES = DEVICE_STATUSES;
const deviceStatusSchema = new mongoose_1.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    plantId: {
        type: String,
        required: true,
        index: true,
    },
    plcId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: DEVICE_STATUSES,
    },
    lastEvent: {
        type: String,
        required: true,
        enum: watchdog_event_model_1.WATCHDOG_EVENT_TYPES,
    },
    lastEventAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
deviceStatusSchema.index({ plantId: 1, status: 1 });
const DeviceStatusModel = mongoose_1.default.model("watchdogDeviceStatuses", deviceStatusSchema, "watchdogDeviceStatuses");
exports.DeviceStatusModel = DeviceStatusModel;
