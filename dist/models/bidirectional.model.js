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
exports.BidirectionalModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bidirectionalSchema = new mongoose_1.Schema({
    dataLoggerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "dataLoggers",
        required: true,
    },
    assetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
    },
    referenceSensors: {
        controlSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
        tripSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
        hmiSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
        softwareSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
        manualSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
        bypassFormulaSensorId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "sensors",
        },
    },
    equipmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "LayoutEquipments",
        required: true,
    },
    bidirectionalSensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sensors",
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });
const BidirectionalModel = mongoose_1.default.model("bidirectional", bidirectionalSchema, "bidirectional");
exports.BidirectionalModel = BidirectionalModel;
