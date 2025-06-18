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
exports.dataLoggerSensorConfigSchema = exports.DLSensorConfigModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const data_logger_constant_1 = require("../constants/data-logger.constant");
require('./sensorModel');
const dataLoggerSensorConfigSchema = new mongoose_1.Schema({
    dataLoggerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "dataLoggers",
        required: true,
    },
    sensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sensors",
        required: true,
    },
    sensorType: { type: String, enum: ["analog", "boolean"], required: true },
    referenceSensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sensors",
    },
    referenceSensorPurpose: {
        type: String,
        enum: ["totalizer"],
        trim: true,
    },
    scalingFactor: { type: Number },
    start: { type: Number },
    end: { type: Number },
    type: { type: String, enum: Object.values(data_logger_constant_1.SENSOR_TYPE), required: false },
    wordOrder: {
        type: String,
    },
    function: {
        type: String,
        trim: true,
    },
    bitIndex: { type: Number },
    version: { type: Number, default: 0, required: true },
}, { _id: false });
exports.dataLoggerSensorConfigSchema = dataLoggerSensorConfigSchema;
const DLSensorConfigModel = mongoose_1.default.model("dataLoggerSensorConfig", dataLoggerSensorConfigSchema, "dataLoggerSensorConfig");
exports.DLSensorConfigModel = DLSensorConfigModel;
