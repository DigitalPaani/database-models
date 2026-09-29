import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * A manifest entry points at one of three things in Google Drive:
 *  FOLDER     -> the Drive folder mirroring a repository directory
 *  FILE_DOC   -> the Doc describing one source file
 *  FOLDER_DOC -> the "Readme" Doc summarizing a directory's contents
 */
export type DocManifestKind = "FOLDER" | "FILE_DOC" | "FOLDER_DOC";

export interface IDocManifestEntry extends Document {
  // Declared explicitly — mongoose's Document leaves _id as `unknown`.
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

const DocManifestSchema = new Schema<IDocManifestEntry>(
  {
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
  },
  { timestamps: true }
);

// One Drive object per (repo, path, kind) — the uniqueness that prevents duplicates.
DocManifestSchema.index({ repoFullName: 1, path: 1, kind: 1 }, { unique: true });

export const DocManifestModel = mongoose.model<IDocManifestEntry>(
  "docManifest",
  DocManifestSchema,
  "docManifests"
);
