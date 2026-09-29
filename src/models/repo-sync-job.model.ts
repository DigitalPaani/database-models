import mongoose, { Schema, Document, Types } from "mongoose";

export type RepoSyncJobStatus = "PENDING" | "PROCESSING" | "DONE" | "FAILED";
export type RepoSyncJobTrigger = "PUSH" | "BOOTSTRAP" | "MANUAL";

/** Counters reported back on a finished job so a run can be audited at a glance. */
export interface IRepoSyncJobStats {
  filesProcessed: number;
  foldersProcessed: number;
  docsCreated: number;
  docsUpdated: number;
  docsArchived: number;
}

export interface IRepoSyncJob extends Document {
  // Declared explicitly — mongoose's Document leaves _id as `unknown`, and the
  // sync worker addresses jobs by ID.
  _id: Types.ObjectId;
  repoFullName: string;
  repoCloneUrl: string;
  installationId: number;
  beforeSha: string | null;
  afterSha: string;
  trigger: RepoSyncJobTrigger;
  status: RepoSyncJobStatus;
  attempts: number;
  error: string | null;
  stats: IRepoSyncJobStats;
  startedAt: Date | null;
  finishedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const RepoSyncJobStatsSchema = new Schema<IRepoSyncJobStats>(
  {
    filesProcessed: { type: Number, default: 0 },
    foldersProcessed: { type: Number, default: 0 },
    docsCreated: { type: Number, default: 0 },
    docsUpdated: { type: Number, default: 0 },
    docsArchived: { type: Number, default: 0 },
  },
  { _id: false }
);

const RepoSyncJobSchema = new Schema<IRepoSyncJob>(
  {
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
  },
  { timestamps: true }
);

// The sync worker claims the oldest pending job; this index keeps that cheap.
RepoSyncJobSchema.index({ status: 1, createdAt: 1 });

export const RepoSyncJobModel = mongoose.model<IRepoSyncJob>(
  "repoSyncJob",
  RepoSyncJobSchema,
  "repoSyncJobs"
);
