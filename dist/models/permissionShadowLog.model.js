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
exports.PermissionShadowLogModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const permissionShadowLogSchema = new mongoose_1.Schema({
    route: { type: String, required: true },
    method: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', default: null },
    legacyTag: { type: String, default: null },
    permissionKey: { type: String, default: null },
    legacy: { type: String, enum: ['ALLOW', 'DENY', 'ERROR', 'UNMAPPED'], required: true },
    v2: { type: String, enum: ['ALLOW', 'DENY', 'ERROR', 'UNMAPPED'], required: true },
    agreed: { type: Boolean, required: true },
    divergenceReason: { type: String, default: null },
    legacyFailedOpen: { type: Boolean, default: false },
    v2Error: { type: String, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });
// Promotion query: "disagreements for this route in the last N days".
permissionShadowLogSchema.index({ route: 1, agreed: 1, createdAt: -1 });
permissionShadowLogSchema.index({ agreed: 1, createdAt: -1 });
permissionShadowLogSchema.index({ legacyFailedOpen: 1, route: 1 });
// Keep 45 days — long enough to prove a route is quiet, short enough to bound growth.
permissionShadowLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 45 * 24 * 60 * 60 });
const PermissionShadowLogModel = mongoose_1.default.model('PermissionShadowLog', permissionShadowLogSchema, 'permissionShadowLogs');
exports.PermissionShadowLogModel = PermissionShadowLogModel;
