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
const Schema = mongoose_1.default.Schema;
const flocChildSensorsSchema = new Schema({
    FDSTParent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL30: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL30Image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL60: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL60Image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL90: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOL90Image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOLRaw: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOLCustom: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOLCustomImage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOLIssue: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    SVOLIssueImage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
});
const sensor = new Schema({
    sensorName: String,
    sensorTag: String,
    sensorNickName: String,
    plantId: mongoose_1.default.Schema.Types.ObjectId,
    workspaceId: mongoose_1.default.Schema.Types.ObjectId,
    dataType: String,
    sensorType: String,
    dataInputType: String,
    plcId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
    },
    isEnabled: Boolean,
    sensorTypeAbr: {
        type: String,
        required: false,
    },
    storeId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
    },
    oldSensorTag: String,
    sensorOffSet: {
        type: mongoose_1.Types.ObjectId,
        ref: "sensorOffSet",
    },
    parentSensor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
    },
    flocChildSensors: {
        type: flocChildSensorsSchema,
        required: false
    },
}, {
    timestamps: true,
});
const SensorsModel = mongoose_1.default.model("sensors", sensor);
exports.default = SensorsModel;
