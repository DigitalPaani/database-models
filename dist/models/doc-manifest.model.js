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
exports.DocManifestModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DocManifestSchema = new mongoose_1.Schema({
    repoFullName: { type: String, required: true, index: true },
    path: { type: String, required: true, default: "" },
    kind: {
        type: String,
        enum: ["FOLDER", "FILE_DOC", "FOLDER_DOC"],
        required: true,
    },
    driveId: { type: String, required: true },
    title: { type: String, required: true },
    archivedAt: { type: Date, default: null },
}, { timestamps: true });
// One Drive object per (repo, path, kind) — the uniqueness that prevents duplicates.
DocManifestSchema.index({ repoFullName: 1, path: 1, kind: 1 }, { unique: true });
exports.DocManifestModel = mongoose_1.default.model("docManifest", DocManifestSchema, "docManifests");
