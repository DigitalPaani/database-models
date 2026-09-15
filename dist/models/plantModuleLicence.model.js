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
exports.PlantModuleLicenceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Kept in sync with node-backend src/constants/permissionTree.ts (MODULES).
const MODULES = ['ops', 'data', 'tasks', 'dash', 'iot', 'inv', 'alerts', 'core'];
const plantModuleLicenceSchema = new mongoose_1.Schema({
    plantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Plant', required: true },
    moduleKey: { type: String, enum: [...MODULES], required: true },
    licensed: { type: Boolean, required: true, default: false },
    licensedAt: { type: Date, default: null },
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'NewUser', default: null },
}, { timestamps: true });
plantModuleLicenceSchema.index({ plantId: 1, moduleKey: 1 }, { unique: true });
// Hot path: all licensed modules for a plant, cached and shared across users.
plantModuleLicenceSchema.index({ plantId: 1, licensed: 1 });
const PlantModuleLicenceModel = mongoose_1.default.model('PlantModuleLicence', plantModuleLicenceSchema, 'plantModuleLicences');
exports.PlantModuleLicenceModel = PlantModuleLicenceModel;
