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
exports.NewCacheModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const newCacheSchema = new mongoose_1.Schema({
    sensorTag: {
        type: String,
        required: true,
        trim: true,
    },
    formulaId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "formulas"
    },
    sensorSettingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "SensorSettings",
    },
    details: {
        type: Object,
        required: true,
    },
    firstDataDate: {
        type: Number,
        require: true,
        default: null
    },
    rawValue: {
        type: [mongoose_1.Schema.Types.Mixed],
        required: true,
    },
    nextCalculationTime: {
        type: Number,
        required: true
    },
    values: [
        {
            timestamp: {
                type: Number, // Assuming epoch is stored as a number
                required: true,
            },
            aggregatedValue: {
                type: [Number],
                required: true,
            },
            isCalculated: { type: Boolean, default: false },
        },
    ],
}, {
    timestamps: true,
});
const NewCacheModel = mongoose_1.default.model("newCache", newCacheSchema, "newCaches");
exports.NewCacheModel = NewCacheModel;
