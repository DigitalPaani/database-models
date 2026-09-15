import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

/**
 * Append-only record of every change to who can do what.
 *
 * The model doc requires a written reason on override, exception and grant
 * changes; this is where those land. Nothing updates or deletes a row — a
 * correction is a new row, so the trail cannot be rewritten, Global Admin
 * included.
 */
export type AuditChangeType =
  | 'ROLE_CHANGE'
  | 'GRANT_CHANGE'
  | 'OVERRIDE_ADD'
  | 'OVERRIDE_REMOVE'
  | 'EXCEPTION_GRANT'
  | 'EXCEPTION_REVOKE'
  | 'PLANT_ASSIGN'
  | 'PLANT_UNASSIGN'
  | 'LICENCE_CHANGE'
  | 'USER_DEACTIVATED'
  | 'USER_REACTIVATED'
  | 'SESSIONS_REVOKED';

interface IPermissionAuditLog extends Document {
  /** Who made the change. Null only for the CLI bootstrap path. */
  actorId: Types.ObjectId | null;
  actorLabel: string;
  targetUserId: Types.ObjectId | null;
  plantId: Types.ObjectId | null;
  changeType: AuditChangeType;
  permissionKey: string | null;
  before: unknown;
  after: unknown;
  reason: string;
  /** Ties a bulk edit and its skipped rows together (§11.2). */
  bulkOperationId: Types.ObjectId | null;
  /**
   * Commercial reference for a licence change — the contract or order that
   * authorised it. Separate from `reason`, which is the human explanation:
   * "why" and "under what agreement" are different questions, and finance asks
   * the second one.
   */
  contractRef: string | null;
  createdAt: Date;
}

const permissionAuditLogSchema = new Schema<IPermissionAuditLog>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    actorLabel: { type: String, required: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', default: null },
    changeType: { type: String, required: true },
    permissionKey: { type: String, default: null },
    before: { type: Schema.Types.Mixed, default: null },
    after: { type: Schema.Types.Mixed, default: null },
    reason: { type: String, required: true, trim: true },
    bulkOperationId: { type: Schema.Types.ObjectId, default: null },
    contractRef: { type: String, default: null, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

permissionAuditLogSchema.index({ targetUserId: 1, createdAt: -1 });
permissionAuditLogSchema.index({ plantId: 1, createdAt: -1 });
permissionAuditLogSchema.index({ changeType: 1, createdAt: -1 });
// "who has ever been made a Global Admin, and why?"
permissionAuditLogSchema.index({ permissionKey: 1, createdAt: -1 });

// Append-only: block the update paths outright rather than trusting callers.
const blockUpdate = function (this: unknown, next: (err?: Error) => void) {
  next(new Error('permissionAuditLogs is append-only — write a new row instead'));
};
permissionAuditLogSchema.pre('updateOne', blockUpdate);
permissionAuditLogSchema.pre('updateMany', blockUpdate);
permissionAuditLogSchema.pre('findOneAndUpdate', blockUpdate);
permissionAuditLogSchema.pre('deleteOne', blockUpdate);
permissionAuditLogSchema.pre('deleteMany', blockUpdate);

const PermissionAuditLogModel: Model<IPermissionAuditLog> =
  mongoose.model<IPermissionAuditLog>(
    'PermissionAuditLog',
    permissionAuditLogSchema,
    'permissionAuditLogs'
  );

export { IPermissionAuditLog, PermissionAuditLogModel };
