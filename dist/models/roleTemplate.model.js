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
exports.RoleTemplateVersionModel = exports.RoleTemplateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const roleTemplateSchema = new mongoose_1.Schema({
    roleKey: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    permissionKeys: { type: [String], default: [] },
    version: { type: Number, default: 1 },
    isSystem: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
}, { timestamps: true });
roleTemplateSchema.index({ roleKey: 1 }, { unique: true, partialFilterExpression: { isArchived: false } });
const RoleTemplateModel = mongoose_1.default.model('RoleTemplate', roleTemplateSchema, 'roleTemplates');
exports.RoleTemplateModel = RoleTemplateModel;
const roleTemplateVersionSchema = new mongoose_1.Schema({
    roleKey: { type: String, required: true },
    version: { type: Number, required: true },
    permissionKeys: { type: [String], default: [] },
    addedKeys: { type: [String], default: [] },
    removedKeys: { type: [String], default: [] },
    holdersAffected: { type: Number, default: 0 },
    reason: { type: String, required: true, trim: true },
    publishedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    publishedByLabel: { type: String, default: '' },
    rolledBackFrom: { type: Number, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });
roleTemplateVersionSchema.index({ roleKey: 1, version: -1 }, { unique: true });
// Append-only, like the audit log: a correction is a new version, never an edit.
const blockUpdate = function (next) {
    next(new Error('roleTemplateVersions is append-only — publish a new version instead'));
};
roleTemplateVersionSchema.pre('updateOne', blockUpdate);
roleTemplateVersionSchema.pre('updateMany', blockUpdate);
roleTemplateVersionSchema.pre('findOneAndUpdate', blockUpdate);
const RoleTemplateVersionModel = mongoose_1.default.model('RoleTemplateVersion', roleTemplateVersionSchema, 'roleTemplateVersions');
exports.RoleTemplateVersionModel = RoleTemplateVersionModel;
