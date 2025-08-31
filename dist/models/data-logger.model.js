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
exports.DataLoggerModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dataLoggerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        required: true,
    },
    version: {
        type: Number,
        default: 0,
    },
    // JSON fields in camelCase
    debug: {
        type: Boolean,
        default: false,
        required: true,
    },
    plcBrand: {
        type: String,
        required: true,
    },
    pollingInterval: {
        type: Number,
        required: true,
    },
    plcModel: {
        type: String,
        required: true,
        trim: true,
    },
    assetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plant",
        required: true,
    },
    modbusHost: {
        type: String,
        required: true,
    },
    modbusPort: {
        type: Number,
        required: true,
    },
    unitIdReal: {
        type: Number,
        required: true,
    },
    startAddressReal: {
        type: Number,
        required: true,
    },
    registerCountReal: {
        type: Number,
        required: true,
    },
    unitIdBool: {
        type: Number,
        required: true,
    },
    startAddressBool: {
        type: Number,
        required: true,
    },
    registerCountBool: {
        type: Number,
        required: true,
    },
    // common field for all schema
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "NewUser",
        default: null,
        validate: {
            validator: function (value) {
                if (this.isDeleted) {
                    return value != null;
                }
                return value == null;
            },
            message: "deletedBy must be set when isDeleted is true",
        }
    },
}, { timestamps: true });
// Partial Unique Index
dataLoggerSchema.index({ serialNumber: 1 }, {
    unique: true,
    partialFilterExpression: {
        isDeleted: false,
        serialNumber: { $exists: true },
    },
});
const DataLoggerModel = mongoose_1.default.model("dataLoggers", dataLoggerSchema, "dataLoggers");
exports.DataLoggerModel = DataLoggerModel;
