import type { Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

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

export const LIBRARY_VERSION_ACTIONS = ['CREATE', 'UPDATE', 'ARCHIVE', 'RESTORE'] as const;
export type LibraryVersionAction = (typeof LIBRARY_VERSION_ACTIONS)[number];

export interface LibraryVersionSummary {
  /** Items by path, e.g. 'alerts.motor_current_high', 'readings.Motor current'. */
  added: string[];
  removed: string[];
  /** Items present on both sides that differ, and top-level fields that changed ('tier', 'formRules'). */
  changed: string[];
  /** The "to confirm" line was cleared: the owner accepted the reasoned guess. */
  confirmed: boolean;
}

export interface EquipmentLibraryTypeVersionDoc {
  _id: Types.ObjectId;
  code: string;
  version: number;
  action: LibraryVersionAction;
  snapshot: Record<string, unknown>;
  changedBy: Types.ObjectId | null;
  changedByLabel: string;
  reason: string;
  summary: LibraryVersionSummary;
  createdAt: Date;
}

const equipmentLibraryTypeVersionSchema = new Schema<EquipmentLibraryTypeVersionDoc>(
  {
    code: { type: String, required: true },
    version: { type: Number, required: true, min: 1 },
    action: { type: String, enum: [...LIBRARY_VERSION_ACTIONS], required: true },
    snapshot: { type: Schema.Types.Mixed, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    changedByLabel: { type: String, default: '' },
    reason: { type: String, required: true, trim: true },
    summary: {
      type: new Schema<LibraryVersionSummary>(
        {
          added: { type: [String], default: [] },
          removed: { type: [String], default: [] },
          changed: { type: [String], default: [] },
          confirmed: { type: Boolean, default: false },
        },
        { _id: false }
      ),
      default: (): Partial<LibraryVersionSummary> => ({}),
    },
  },
  // minimize off: an empty tagMap in a snapshot stays {} instead of vanishing, so a restore puts back what was there.
  { timestamps: { createdAt: true, updatedAt: false }, minimize: false }
);

equipmentLibraryTypeVersionSchema.index({ code: 1, version: -1 }, { unique: true });

const blockUpdate = function (next: (err?: Error) => void): void {
  next(new Error('equipmentLibraryTypeVersions is append-only — publish a new version instead'));
};
equipmentLibraryTypeVersionSchema.pre('updateOne', blockUpdate);
equipmentLibraryTypeVersionSchema.pre('updateMany', blockUpdate);
equipmentLibraryTypeVersionSchema.pre('findOneAndUpdate', blockUpdate);

const EquipmentLibraryTypeVersionModel: Model<EquipmentLibraryTypeVersionDoc> =
  mongoose.model<EquipmentLibraryTypeVersionDoc>(
    'EquipmentLibraryTypeVersion',
    equipmentLibraryTypeVersionSchema,
    'equipmentLibraryTypeVersions'
  );

export { EquipmentLibraryTypeVersionModel };
