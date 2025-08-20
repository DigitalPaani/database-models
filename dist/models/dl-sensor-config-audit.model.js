"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLSensorConfigAuditModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const data_logger_sensor_config_model_1 = require("./data-logger-sensor-config.model");
const DLSensorConfigAuditModel = mongoose_1.default.model("dataLoggerSensorConfigAudit", data_logger_sensor_config_model_1.dataLoggerSensorConfigSchema, "dataLoggerSensorConfigAudit");
exports.DLSensorConfigAuditModel = DLSensorConfigAuditModel;
