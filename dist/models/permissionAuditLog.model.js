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
exports.PermissionAuditLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const permissionAuditLogSchema = new mongoose_1.Schema({
    actorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    actorLabel: { type: String, required: true },
    targetUserId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', default: null },
    changeType: { type: String, required: true },
    permissionKey: { type: String, default: null },
    before: { type: mongoose_1.Schema.Types.Mixed, default: null },
    after: { type: mongoose_1.Schema.Types.Mixed, default: null },
    reason: { type: String, required: true, trim: true },
    bulkOperationId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    contractRef: { type: String, default: null, trim: true },
}, { timestamps: { createdAt: true, updatedAt: false } });
permissionAuditLogSchema.index({ targetUserId: 1, createdAt: -1 });
permissionAuditLogSchema.index({ plantId: 1, createdAt: -1 });
permissionAuditLogSchema.index({ changeType: 1, createdAt: -1 });
// "who has ever been made a Global Admin, and why?"
permissionAuditLogSchema.index({ permissionKey: 1, createdAt: -1 });
// Append-only: block the update paths outright rather than trusting callers.
const blockUpdate = function (next) {
    next(new Error('permissionAuditLogs is append-only — write a new row instead'));
};
permissionAuditLogSchema.pre('updateOne', blockUpdate);
permissionAuditLogSchema.pre('updateMany', blockUpdate);
permissionAuditLogSchema.pre('findOneAndUpdate', blockUpdate);
permissionAuditLogSchema.pre('deleteOne', blockUpdate);
permissionAuditLogSchema.pre('deleteMany', blockUpdate);
const PermissionAuditLogModel = mongoose_1.default.model('PermissionAuditLog', permissionAuditLogSchema, 'permissionAuditLogs');
exports.PermissionAuditLogModel = PermissionAuditLogModel;
