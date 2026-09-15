import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

/**
 * A role template — the tick-pattern a role confers, as data.
 *
 * These were code constants. Moving them into Mongo is what makes an editor
 * possible, and it is also what re-opens the pre-mortem findings the constants
 * closed by construction: publish without validation (B2), no versioning and a
 * one-slot rollback (H7), concurrent edits clobbering each other (H8).
 *
 * So the guardrails live on this collection rather than in a screen:
 *   - `version` is a compare-and-swap token; a stale write is rejected (H8)
 *   - every publish writes a roleTemplateVersion row, so rollback is N-deep (H7)
 *   - `isSystem` protects the 5 seeded roles from deletion (§4's closed catalog)
 *   - the tick-set is validated before it is stored (B2)
 */
interface IRoleTemplate extends Document {
  roleKey: string;
  name: string;
  description: string;
  /** Stored already closed under the dependency ladder. */
  permissionKeys: string[];
  version: number;
  /** One of the 5 from §4 — editable, never deletable. */
  isSystem: boolean;
  /** Read-only for everyone; nothing but a migration should flip this. */
  isLocked: boolean;
  isArchived: boolean;
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
}

const roleTemplateSchema = new Schema<IRoleTemplate>(
  {
    roleKey: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    permissionKeys: { type: [String], default: [] },
    version: { type: Number, default: 1 },
    isSystem: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
  },
  { timestamps: true }
);

roleTemplateSchema.index(
  { roleKey: 1 },
  { unique: true, partialFilterExpression: { isArchived: false } }
);

const RoleTemplateModel: Model<IRoleTemplate> = mongoose.model<IRoleTemplate>(
  'RoleTemplate',
  roleTemplateSchema,
  'roleTemplates'
);

/**
 * One row per published version — the "what changed, by whom, why" record.
 *
 * The prototype kept a single snapshot, so a rollback was itself
 * unrecoverable (H7). This is append-only and keeps the computed diff, so the
 * version picker can show "+3 grants / −1 revoke" without recomputing it.
 */
interface IRoleTemplateVersion extends Document {
  roleKey: string;
  version: number;
  permissionKeys: string[];
  addedKeys: string[];
  removedKeys: string[];
  /** How many people held this role when it was published. */
  holdersAffected: number;
  reason: string;
  publishedBy: Types.ObjectId | null;
  publishedByLabel: string;
  /** Set when this version was produced by rolling back to an earlier one. */
  rolledBackFrom: number | null;
}

const roleTemplateVersionSchema = new Schema<IRoleTemplateVersion>(
  {
    roleKey: { type: String, required: true },
    version: { type: Number, required: true },
    permissionKeys: { type: [String], default: [] },
    addedKeys: { type: [String], default: [] },
    removedKeys: { type: [String], default: [] },
    holdersAffected: { type: Number, default: 0 },
    reason: { type: String, required: true, trim: true },
    publishedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    publishedByLabel: { type: String, default: '' },
    rolledBackFrom: { type: Number, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

roleTemplateVersionSchema.index({ roleKey: 1, version: -1 }, { unique: true });

// Append-only, like the audit log: a correction is a new version, never an edit.
const blockUpdate = function (next: (err?: Error) => void) {
  next(new Error('roleTemplateVersions is append-only — publish a new version instead'));
};
roleTemplateVersionSchema.pre('updateOne', blockUpdate);
roleTemplateVersionSchema.pre('updateMany', blockUpdate);
roleTemplateVersionSchema.pre('findOneAndUpdate', blockUpdate);

const RoleTemplateVersionModel: Model<IRoleTemplateVersion> =
  mongoose.model<IRoleTemplateVersion>(
    'RoleTemplateVersion',
    roleTemplateVersionSchema,
    'roleTemplateVersions'
  );

export {
  IRoleTemplate,
  IRoleTemplateVersion,
  RoleTemplateModel,
  RoleTemplateVersionModel,
};
