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
exports.SensorModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SensorSchema = new mongoose_1.Schema({
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "company" },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true }, // ["1 Minute", "1 Millisecond", "1 Hour"]
    purpose: { type: [String], required: true }, // ["pH", "BOD", "COD", "Turbidity"]
    inputType: {
        type: [String],
        enum: ["Modbus", "Analog", "Digital"], // Restricts values to these three options
        required: true,
    },
    tags: { type: [String], default: [] },
}, { timestamps: true });
const SensorModel = mongoose_1.default.model("SensorList", SensorSchema, 'SensorLists');
exports.SensorModel = SensorModel;
