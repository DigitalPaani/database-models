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
exports.UserPermissionOverrideModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userPermissionOverrideSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', default: null },
    permissionKey: { type: String, required: true },
    effect: { type: String, enum: ['grant', 'revoke'], required: true },
    reason: {
        type: String,
        required: [true, 'A written reason is mandatory for every override (§9)'],
        trim: true,
        minlength: [10, 'Override reason must be meaningful — at least 10 characters'],
    },
    grantedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
userPermissionOverrideSchema.index({ userId: 1, plantId: 1, permissionKey: 1 }, { unique: true, partialFilterExpression: { isActive: true } });
userPermissionOverrideSchema.index({ userId: 1, isActive: 1 });
// "Who has self-approve removed, and why?" — the compliance question.
userPermissionOverrideSchema.index({ permissionKey: 1, effect: 1, isActive: 1 });
const UserPermissionOverrideModel = mongoose_1.default.model('UserPermissionOverride', userPermissionOverrideSchema, 'userPermissionOverrides');
exports.UserPermissionOverrideModel = UserPermissionOverrideModel;
