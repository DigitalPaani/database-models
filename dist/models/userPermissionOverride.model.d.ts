import type { Document, Model, Types } from 'mongoose';
/**
 * Per-user, per-plant adjustment on top of the role template (§9).
 *
 * The four-eyes lever is one document:
 *   { permissionKey: 'ops.approvals.selfApprove', effect: 'revoke',
 *     plantId: <plant>, reason: 'Four-eyes rule at client site, DP-1201' }
 *
 * A written reason is mandatory on every change and mirrored into
 * permissionAuditLogs. The role template is never touched.
 */
interface IUserPermissionOverride extends Document {
    userId: Types.ObjectId;
    /** null = plant-less scope (admin-grant surface). */
    plantId: Types.ObjectId | null;
    permissionKey: string;
    effect: 'grant' | 'revoke';
    reason: string;
    grantedBy: Types.ObjectId;
    isActive: boolean;
}
declare const UserPermissionOverrideModel: Model<IUserPermissionOverride>;
export { IUserPermissionOverride, UserPermissionOverrideModel };
//# sourceMappingURL=userPermissionOverride.model.d.ts.map