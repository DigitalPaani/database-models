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
exports.EquipmentLibraryTypeVersionModel = exports.LIBRARY_VERSION_ACTIONS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
/**
 * One row per change to a library type: what it became, who changed it, why, and what moved.
 *
 * Append-only, as roleTemplateVersions: a correction is a new version, never an edit, so the history a reviewer
 * reads is the history that happened. `snapshot` is the whole content at that version, which is what lets a
 * machine's `libraryVersion` be explained and a bad edit be undone by publishing an old snapshot again.
 *
 * The same schema as node-backend's src/components/equipment/models/equipmentLibraryTypeVersion.model.ts, which
 * owns this collection. Change the two together.
 */
exports.LIBRARY_VERSION_ACTIONS = ['CREATE', 'UPDATE', 'ARCHIVE', 'RESTORE'];
const equipmentLibraryTypeVersionSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    version: { type: Number, required: true, min: 1 },
    action: { type: String, enum: [...exports.LIBRARY_VERSION_ACTIONS], required: true },
    snapshot: { type: mongoose_1.Schema.Types.Mixed, required: true },
    changedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
    changedByLabel: { type: String, default: '' },
    reason: { type: String, required: true, trim: true },
    summary: {
        type: new mongoose_1.Schema({
            added: { type: [String], default: [] },
            removed: { type: [String], default: [] },
            changed: { type: [String], default: [] },
            confirmed: { type: Boolean, default: false },
        }, { _id: false }),
        default: () => ({}),
    },
}, 
// minimize off: an empty tagMap in a snapshot stays {} instead of vanishing, so a restore puts back what was there.
{ timestamps: { createdAt: true, updatedAt: false }, minimize: false });
equipmentLibraryTypeVersionSchema.index({ code: 1, version: -1 }, { unique: true });
const blockUpdate = function (next) {
    next(new Error('equipmentLibraryTypeVersions is append-only — publish a new version instead'));
};
equipmentLibraryTypeVersionSchema.pre('updateOne', blockUpdate);
equipmentLibraryTypeVersionSchema.pre('updateMany', blockUpdate);
equipmentLibraryTypeVersionSchema.pre('findOneAndUpdate', blockUpdate);
const EquipmentLibraryTypeVersionModel = mongoose_1.default.model('EquipmentLibraryTypeVersion', equipmentLibraryTypeVersionSchema, 'equipmentLibraryTypeVersions');
exports.EquipmentLibraryTypeVersionModel = EquipmentLibraryTypeVersionModel;
