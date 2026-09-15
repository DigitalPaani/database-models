import type { Document, Model, Types } from 'mongoose';
/**
 * Append-only record of every change to who can do what.
 *
 * The model doc requires a written reason on override, exception and grant
 * changes; this is where those land. Nothing updates or deletes a row — a
 * correction is a new row, so the trail cannot be rewritten, Global Admin
 * included.
 */
export type AuditChangeType = 'ROLE_CHANGE' | 'GRANT_CHANGE' | 'OVERRIDE_ADD' | 'OVERRIDE_REMOVE' | 'EXCEPTION_GRANT' | 'EXCEPTION_REVOKE' | 'PLANT_ASSIGN' | 'PLANT_UNASSIGN' | 'LICENCE_CHANGE' | 'USER_DEACTIVATED' | 'USER_REACTIVATED' | 'SESSIONS_REVOKED';
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
declare const PermissionAuditLogModel: Model<IPermissionAuditLog>;
export { IPermissionAuditLog, PermissionAuditLogModel };
//# sourceMappingURL=permissionAuditLog.model.d.ts.map