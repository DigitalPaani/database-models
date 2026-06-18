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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVICE_STATUS = exports.SetPointActionLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const commonConstants_1 = __importDefault(require("../constants/commonConstants"));
const DEVICE_STATUS = {
    matched: "matched",
    mismatched: "mismatched",
    unknown: "unknown",
};
exports.DEVICE_STATUS = DEVICE_STATUS;
const setPointActionLogSchema = new mongoose_1.Schema({
    setPointId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SetPoint",
        required: true,
    },
    sensorIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
    },
    controlTopic: {
        type: String,
        required: true,
    },
    sensorTag: [
        {
            type: String,
            required: true,
        },
    ],
    requestedAction: {
        type: Number,
        enum: [0, 1],
        required: true,
    },
    payload: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    published: {
        type: Boolean,
        default: false,
        required: true,
    },
    publishedAt: {
        type: Number,
    },
    statusTopic: {
        type: String,
    },
    acknowledged: {
        type: Boolean,
        default: false,
        required: true,
    },
    acknowledgedAt: {
        type: Number,
    },
    rawMessage: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    deviceValue: {
        type: Number,
    },
    deviceStatus: {
        type: String,
        enum: Object.values(DEVICE_STATUS),
        default: DEVICE_STATUS.unknown,
    },
    status: {
        type: String,
        enum: Object.values(commonConstants_1.default.REMOTE_CONTROL_STATUS),
        default: commonConstants_1.default.REMOTE_CONTROL_STATUS.initiated,
    },
    success: {
        type: Boolean,
        default: false,
        required: true,
    },
    message: {
        type: String,
    },
    errorDetails: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });
const SetPointActionLogModel = mongoose_1.default.model("setPointActionLogs", setPointActionLogSchema, "setPointActionLogs");
exports.SetPointActionLogModel = SetPointActionLogModel;
