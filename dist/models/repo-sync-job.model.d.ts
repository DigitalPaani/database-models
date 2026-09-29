import mongoose, { Document, Types } from "mongoose";
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
export declare const RepoSyncJobModel: mongoose.Model<IRepoSyncJob, {}, {}, {}, mongoose.Document<unknown, {}, IRepoSyncJob> & IRepoSyncJob & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=repo-sync-job.model.d.ts.map