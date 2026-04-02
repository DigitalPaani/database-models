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
exports.DataInputBulkEntryLogsModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
;
;
const dataInputSchema = new mongoose_1.Schema({
    calculatedAt: {
        type: Number,
        required: false
    },
    sensorId: {
        type: String,
        required: false
    },
    sensorTag: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    assetId: {
        type: String,
        required: false
    },
    errorExists: {
        type: Boolean,
        required: false
    },
    errorMessage: {
        type: String,
        required: false
    }
});
const DataInputBulkEntryLogSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: false
    },
    dataInput: {
        type: dataInputSchema,
        required: false
    },
    fileLink: {
        type: String,
        required: false
    },
    fileType: {
        type: String,
        required: false
    },
    success: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });
const DataInputBulkEntryLogsModel = mongoose_1.default.model("data-input-bulk-entry-logs", DataInputBulkEntryLogSchema, "data-input-bulk-entry-logs");
exports.DataInputBulkEntryLogsModel = DataInputBulkEntryLogsModel;
