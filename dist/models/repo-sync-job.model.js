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
exports.RepoSyncJobModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RepoSyncJobStatsSchema = new mongoose_1.Schema({
    filesProcessed: { type: Number, default: 0 },
    foldersProcessed: { type: Number, default: 0 },
    docsCreated: { type: Number, default: 0 },
    docsUpdated: { type: Number, default: 0 },
    docsArchived: { type: Number, default: 0 },
}, { _id: false });
const RepoSyncJobSchema = new mongoose_1.Schema({
    repoFullName: { type: String, required: true, index: true },
    repoCloneUrl: { type: String, required: true },
    installationId: { type: Number, required: true },
    beforeSha: { type: String, default: null },
    afterSha: { type: String, required: true },
    trigger: {
        type: String,
        enum: ["PUSH", "BOOTSTRAP", "MANUAL"],
        default: "PUSH",
    },
    status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "DONE", "FAILED"],
        default: "PENDING",
        index: true,
    },
    attempts: { type: Number, default: 0 },
    error: { type: String, default: null },
    stats: { type: RepoSyncJobStatsSchema, default: () => ({}) },
    startedAt: { type: Date, default: null },
    finishedAt: { type: Date, default: null },
}, { timestamps: true });
// The sync worker claims the oldest pending job; this index keeps that cheap.
RepoSyncJobSchema.index({ status: 1, createdAt: 1 });
exports.RepoSyncJobModel = mongoose_1.default.model("repoSyncJob", RepoSyncJobSchema, "repoSyncJobs");
