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
exports.WATCHDOG_ACTIONS_TAKEN = exports.WATCHDOG_CAUSE_CODES = exports.WATCHDOG_EVENT_TYPES = exports.WatchdogEventModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const WATCHDOG_EVENT_TYPES = [
    "BREAK_START",
    "CAUSE_CHANGE",
    "ACTION",
    "RECOVERY",
    "DEVICE_DOWN",
    "DEVICE_UP",
    "DATALOGGER_STARTUP",
];
exports.WATCHDOG_EVENT_TYPES = WATCHDOG_EVENT_TYPES;
const WATCHDOG_CAUSE_CODES = [
    "CABLE_UNPLUGGED",
    "WIFI_DISCONNECTED",
    "WIFI_WEAK_SIGNAL",
    "ROUTER_UNREACHABLE",
    "WAN_DOWN",
    "PLC_DOWN",
    "HMI_DOWN",
    "FIRST_START",
    "SCRIPT_RESTART",
    "SYSTEM_BOOT_CLEAN",
    "SYSTEM_BOOT_UNCLEAN",
];
exports.WATCHDOG_CAUSE_CODES = WATCHDOG_CAUSE_CODES;
const WATCHDOG_ACTIONS_TAKEN = [
    "NONE",
    "NET_RESET",
    "ROUTER_REBOOT",
    "DATALOGGER_REBOOT",
];
exports.WATCHDOG_ACTIONS_TAKEN = WATCHDOG_ACTIONS_TAKEN;
const watchdogEventSchema = new mongoose_1.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    incidentId: {
        type: String,
        required: true,
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
    deviceId: {
        type: String,
        required: true,
        index: true,
    },
    event: {
        type: String,
        required: true,
        enum: WATCHDOG_EVENT_TYPES,
    },
    causeCode: {
        type: String,
        enum: [...WATCHDOG_CAUSE_CODES, null],
        default: null,
    },
    actionTaken: {
        type: String,
        required: true,
        enum: WATCHDOG_ACTIONS_TAKEN,
        default: "NONE",
    },
    downtimeSeconds: {
        type: Number,
        default: null,
    },
    detail: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    TIMESTAMP: {
        type: String,
        required: true,
    },
    receivedAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
const WatchdogEventModel = mongoose_1.default.model("watchdogEvents", watchdogEventSchema, "watchdogEvents");
exports.WatchdogEventModel = WatchdogEventModel;
