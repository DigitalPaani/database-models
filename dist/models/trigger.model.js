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
exports.TriggerModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const triggerConst_1 = require("../constants/triggerConst");
const recurrenceSchema = new mongoose_1.Schema({
    frequency: {
        type: String,
        enum: Object.values(triggerConst_1.RECURRENCE_FREQUENCY_TYPES),
    },
    interval: {
        type: Number,
        default: 1, // e.g., every 1 day, 2 weeks, etc.
    },
    daysOfWeek: {
        type: [Number], // e.g., 0 is monday and 6 is sunday, etc.
        validate: {
            validator: function (values) {
                const min = Math.min(...values);
                const max = Math.max(...values);
                return min >= 0 && max <= 6;
            },
            message: "Array numbers should have values between 0 and 6.",
        },
        default: [],
    },
    dayOfMonth: {
        type: [Number], // e.g., 1 for the first day of the month
    },
    weekOfMonth: {
        type: [Number],
    },
    month: {
        type: [Number], // e.g., 1 for January (used for yearly recurrence)
    },
    occurrences: { type: Number },
});
const triggerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    recurrenceText: {
        type: String,
        trim: true,
    },
    scope: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.TRIGGER_SCOPE),
    },
    triggerTag: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userGroup: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserGroup",
        required: false,
    },
    workspace: {
        type: mongoose_1.Schema.ObjectId,
        ref: "NewWorkspace",
    },
    assets: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Plant", required: false },
    type: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.TRIGGER_TYPES),
    },
    startDate: { type: Number },
    endDate: { type: Number },
    recurrence: { type: recurrenceSchema, required: false },
    conditions: {
        type: {
            resolutionFreq: Number,
            observationFreq: Number,
            currentResolutionFreq: { type: Number, default: 0 },
            currentObservationFreq: { type: Number, default: 0 },
            resolutionSensorId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Sensors",
            },
            resolutionSensorTag: {
                type: String,
                required: false,
            },
            observationSensorId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Sensors",
            },
            observationSensorTag: {
                type: String,
                required: false,
            },
            resolutionValue: Number,
            resolutionUnit: Number,
            resolutionTime: Number,
        },
        required: false,
    },
    triggerComponents: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "triggerComponents",
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    triggerSensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Sensors",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(triggerConst_1.TRIGGER_STATUS),
        default: triggerConst_1.TRIGGER_STATUS.active,
    },
    isOpen: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });
const TriggerModel = mongoose_1.default.model("triggers", triggerSchema, "triggers");
exports.TriggerModel = TriggerModel;
