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
exports.INCIDENT_STATUSES = exports.INCIDENT_TYPES = exports.IncidentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const watchdog_event_model_1 = require("./watchdog-event.model");
const INCIDENT_TYPES = ["CONNECTIVITY", "DEVICE"];
exports.INCIDENT_TYPES = INCIDENT_TYPES;
const INCIDENT_STATUSES = ["OPEN", "CLOSED"];
exports.INCIDENT_STATUSES = INCIDENT_STATUSES;
const incidentSchema = new mongoose_1.Schema({
    incidentId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    incidentType: {
        type: String,
        required: true,
        enum: INCIDENT_TYPES,
    },
    status: {
        type: String,
        required: true,
        enum: INCIDENT_STATUSES,
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
    currentCause: {
        type: String,
        enum: [...watchdog_event_model_1.WATCHDOG_CAUSE_CODES, null],
        default: null,
    },
    actionHistory: {
        type: [
            {
                _id: false,
                actionTaken: {
                    type: String,
                    required: true,
                    enum: watchdog_event_model_1.WATCHDOG_ACTIONS_TAKEN,
                },
                at: {
                    type: Date,
                    required: true,
                },
            },
        ],
        default: [],
    },
    startedAt: {
        type: Date,
        required: true,
    },
    recoveredAt: {
        type: Date,
        default: null,
    },
    downtimeSeconds: {
        type: Number,
        default: null,
    },
}, { timestamps: true });
incidentSchema.index({ plantId: 1, status: 1 });
incidentSchema.index({ deviceId: 1, status: 1 });
const IncidentModel = mongoose_1.default.model("watchdogIncidents", incidentSchema, "watchdogIncidents");
exports.IncidentModel = IncidentModel;
