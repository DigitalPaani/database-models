import mongoose, { Document, Types } from "mongoose";
/**
 * A manifest entry points at one of three things in Google Drive:
 *  FOLDER     -> the Drive folder mirroring a repository directory
 *  FILE_DOC   -> the Doc describing one source file
 *  FOLDER_DOC -> the "Readme" Doc summarizing a directory's contents
 */
export type DocManifestKind = "FOLDER" | "FILE_DOC" | "FOLDER_DOC";
export interface IDocManifestEntry extends Document {
    _id: Types.ObjectId;
    repoFullName: string;
    /** Repo-relative POSIX path. The repository root is the empty string. */
    path: string;
    kind: DocManifestKind;
    /** Drive file or folder ID — what makes a re-sync an update, not a duplicate. */
    driveId: string;
    title: string;
    archivedAt: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const DocManifestModel: mongoose.Model<IDocManifestEntry, {}, {}, {}, mongoose.Document<unknown, {}, IDocManifestEntry> & IDocManifestEntry & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=doc-manifest.model.d.ts.map