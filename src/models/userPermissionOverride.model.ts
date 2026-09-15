import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

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

const userPermissionOverrideSchema = new Schema<IUserPermissionOverride>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', default: null },
    permissionKey: { type: String, required: true },
    effect: { type: String, enum: ['grant', 'revoke'], required: true },
    reason: {
      type: String,
      required: [true, 'A written reason is mandatory for every override (§9)'],
      trim: true,
      minlength: [10, 'Override reason must be meaningful — at least 10 characters'],
    },
    grantedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userPermissionOverrideSchema.index(
  { userId: 1, plantId: 1, permissionKey: 1 },
  { unique: true, partialFilterExpression: { isActive: true } }
);
userPermissionOverrideSchema.index({ userId: 1, isActive: 1 });
// "Who has self-approve removed, and why?" — the compliance question.
userPermissionOverrideSchema.index({ permissionKey: 1, effect: 1, isActive: 1 });

const UserPermissionOverrideModel: Model<IUserPermissionOverride> =
  mongoose.model<IUserPermissionOverride>(
    'UserPermissionOverride',
    userPermissionOverrideSchema,
    'userPermissionOverrides'
  );

export { IUserPermissionOverride, UserPermissionOverrideModel };
