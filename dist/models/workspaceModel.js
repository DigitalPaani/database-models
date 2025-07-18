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
exports.WorkspaceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema using the TypeScript interface
const workspaceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '', required: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    assetIds: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Plant', default: [] },
    isArchived: { type: Boolean, default: false },
}, { timestamps: true });
// Create a compound index to ensure unique workspace name within the same admin
workspaceSchema.index({ name: 1, createdBy: 1 }, { unique: true });
// Define the model using the schema and the TypeScript interface
const WorkspaceModel = mongoose_1.default.model('NewWorkspace', workspaceSchema, 'newWorkspaces');
exports.WorkspaceModel = WorkspaceModel;
