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
exports.ExceptionPermissionGrantModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Kept in sync with node-backend src/constants/roleTemplates.ts (EXCEPTION_KEYS).
const EXCEPTION_KEYS = ['REMOTE_ACTUATION', 'VIEW_AS_USER', 'SENSOR_HEALTH'];
const exceptionPermissionGrantSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', required: true },
    exceptionKey: { type: String, enum: [...EXCEPTION_KEYS], required: true },
    reason: {
        type: String,
        required: [true, 'A written reason is mandatory for every exception grant (§10)'],
        trim: true,
        minlength: [10, 'Exception grant reason must be meaningful — at least 10 characters'],
    },
    grantedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    expiresAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
    revokedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
}, { timestamps: true });
// One live grant per (person, plant, exception).
exceptionPermissionGrantSchema.index({ userId: 1, plantId: 1, exceptionKey: 1 }, { unique: true, partialFilterExpression: { revokedAt: null } });
exceptionPermissionGrantSchema.index({ userId: 1, revokedAt: 1 });
// The audit question: "who currently holds remote actuation, anywhere?"
exceptionPermissionGrantSchema.index({ exceptionKey: 1, revokedAt: 1 });
const ExceptionPermissionGrantModel = mongoose_1.default.model('ExceptionPermissionGrant', exceptionPermissionGrantSchema, 'exceptionPermissionGrants');
exports.ExceptionPermissionGrantModel = ExceptionPermissionGrantModel;
