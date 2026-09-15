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
exports.UserSessionModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSessionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', required: true },
    refreshTokenHash: { type: String, required: true },
    family: { type: String, required: true },
    userAgent: { type: String, default: null },
    ip: { type: String, default: null },
    impersonatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    lastUsedAt: { type: Date, default: () => new Date() },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    revokedReason: { type: String, default: null },
}, { timestamps: true });
// Refresh lookup: the only hot query on this collection.
userSessionSchema.index({ refreshTokenHash: 1 }, { unique: true });
// "Kill every session for this user" — the revocation path.
userSessionSchema.index({ userId: 1, revokedAt: 1 });
// Reuse detection across a rotation chain.
userSessionSchema.index({ family: 1 });
// Let Mongo sweep dead rows; revoked rows still expire on their original clock.
userSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const UserSessionModel = mongoose_1.default.model('UserSession', userSessionSchema, 'userSessions');
exports.UserSessionModel = UserSessionModel;
