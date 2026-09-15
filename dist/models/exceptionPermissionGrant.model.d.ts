import type { Document, Model, Types } from 'mongoose';
/**
 * The 3 exception permissions (§10): remote actuation, view-as-another-user,
 * sensor-health. Granted one person + one plant + one reason at a time.
 *
 * Never a role tick, never an override, never a bulk action. They are not
 * leaves in the permission tree and must not be rendered as checkboxes.
 *
 * `expiresAt` is NOT in the write-up — proposed here because exception grants
 * that never expire become permanent by accident. Confirm with the PM; set
 * null to keep the documented behaviour.
 */
interface IExceptionPermissionGrant extends Document {
    userId: Types.ObjectId;
    plantId: Types.ObjectId;
    exceptionKey: string;
    reason: string;
    grantedBy: Types.ObjectId;
    expiresAt: Date | null;
    revokedAt: Date | null;
    revokedBy: Types.ObjectId | null;
}
declare const ExceptionPermissionGrantModel: Model<IExceptionPermissionGrant>;
export { IExceptionPermissionGrant, ExceptionPermissionGrantModel };
//# sourceMappingURL=exceptionPermissionGrant.model.d.ts.map