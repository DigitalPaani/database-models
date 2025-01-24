"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const triggerConst_1 = require("../constants/triggerConst");
const Schema = mongoose_1.default.Schema;
const recurrenceSchema = new Schema({
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
});
const triggerConditionSchema = new Schema({
    operator: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.CONDITIONAL_OPERATORS),
    },
    sensorTag: {
        type: String,
        required: true,
        trim: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    thresholdType: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.CONDITION_THRESHOLD_TYPES),
    },
});
const triggerSchema = new Schema({
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
    dateAsText: {
        type: String,
        trim: true,
    },
    scope: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.TRIGGER_SCOPE),
    },
    userGroup: {
        type: Schema.Types.ObjectId,
        ref: "UserGroup",
        required: false,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(triggerConst_1.TRIGGER_TYPES),
    },
    startDate: { type: Number },
    endDate: { type: Number },
    totalOccurrence: { type: Number },
    occurrenceLeft: { type: Number },
    recurrence: { type: recurrenceSchema, required: false },
    conditions: {
        type: {
            resolutionFreq: Number,
            observationFreq: Number,
            resolutionConditions: [[triggerConditionSchema]],
            observationConditions: [[triggerConditionSchema]],
        },
        required: false,
    },
    triggerComponent: {
        type: [
            {
                componentName: {
                    type: String,
                    enum: Object.values(triggerConst_1.COMPONENT_NAMES),
                },
                componentData: Object,
            },
        ],
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });
const TriggerModel = mongoose_1.default.model("triggers", triggerSchema, "triggers");
exports.TriggerModel = TriggerModel;
