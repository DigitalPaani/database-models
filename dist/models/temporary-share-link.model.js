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
exports.TemporaryShareLinksModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TemporaryShareLinkSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    shortToken: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["INSIGHT"]
    },
    insightId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: false,
    }
}, {
    timestamps: true,
});
TemporaryShareLinkSchema.index({ expiresAt: 1 }, // MongoDB will delete the document as soon as expiresAt is reached.
{ expireAfterSeconds: 0 });
const TemporaryShareLinksModel = mongoose_1.default.model('temporary-share-links', TemporaryShareLinkSchema, 'temporary-share-links');
exports.TemporaryShareLinksModel = TemporaryShareLinksModel;
