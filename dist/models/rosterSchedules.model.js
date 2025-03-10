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
exports.RosterSchedulesModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require('./newUserModel');
const rosterScheduleSchema = new mongoose_1.Schema({
    rosterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    reoccurrenceId: {
        type: String,
        required: false,
    },
    fromDate: {
        type: Number,
        required: true,
    },
    toDate: {
        type: Number,
        required: true,
    },
    bounds: {
        type: Object,
        required: false
    },
    slots: {
        type: [Object],
        required: false
    },
    rule: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
    minimize: false
});
const RosterSchedulesModel = mongoose_1.default.model('roster-schedules', rosterScheduleSchema, 'roster-schedules');
exports.RosterSchedulesModel = RosterSchedulesModel;
