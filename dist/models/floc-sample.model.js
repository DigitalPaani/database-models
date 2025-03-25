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
exports.FlocSampleModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("./sensorModel");
;
;
const flocMarkSchema = new mongoose_1.Schema({
    mark: {
        type: String,
        enum: ['30Mark', '60Mark', '90Mark', 'noSludge', 'floatingSludge']
    },
    timestamp: {
        type: Date
    }
});
const flocSampleSchema = new mongoose_1.Schema({
    sensorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "sensors"
    },
    sampleId: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        default: null,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    hide: {
        type: Boolean,
        default: false,
    },
    marks: {
        type: [flocMarkSchema],
        default: [],
        required: false,
    },
}, {
    timestamps: true,
    minimize: false
});
const FlocSampleModel = mongoose_1.default.model('FlocSamples', flocSampleSchema);
exports.FlocSampleModel = FlocSampleModel;
