import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

// Kept in sync with node-backend src/constants/roleTemplates.ts (ROLE_KEYS).
const ROLE_KEYS = [
  'L1_OPERATOR',
  'L2',
  'L3_LEAD',
  'L4_SENIOR_LEAD',
  'NON_OP',
  'REGULAR_NON_OP',
  'SENIOR_NON_OP',
] as const;

/**
 * Places a user on a plant with exactly one role AT THAT PLANT.
 *
 * Replaces (side-by-side, not in-place) the three legacy join collections:
 *   userGroup-user-role, userGroup-user-asset-role,
 *   userGroup-workspace-asset-user-role
 *
 * userGroupId / workspaceId are deliberately absent — both concepts are being
 * retired. `migratedFrom` keeps a pointer back to the legacy row so the
 * reconciler can report drift while both systems are live.
 *
 * Per PM ruling: role is strictly plant-local. L4 at plant A grants nothing at
 * plant B. Ravi may be L4@A, L3@B, L3@C simultaneously.
 */
interface IUserPlantAssignment extends Document {
  userId: Types.ObjectId;
  plantId: Types.ObjectId;
  /** @deprecated The role moved to NewUser.roleKey. Never read for authority. */
  roleKey?: string | null;
  assignedBy: Types.ObjectId;
  migratedFrom: Types.ObjectId | null;
  isArchived: boolean;
}

const userPlantAssignmentSchema = new Schema<IUserPlantAssignment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    // @deprecated One role per person now lives on NewUser.roleKey. This row is
    // membership: it says the user works at this plant, nothing about what they
    // may do there. Kept (optional, unread) so historical rows still load.
    roleKey: { type: String, enum: [...ROLE_KEYS, null], required: false, default: null },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    migratedFrom: { type: Schema.Types.ObjectId, default: null },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// One role per (user, plant) — "no stacking" (§5), read plant-locally.
userPlantAssignmentSchema.index(
  { userId: 1, plantId: 1 },
  { unique: true, partialFilterExpression: { isArchived: false } }
);
// Hot path: build a user's whole plant→role map in one query.
userPlantAssignmentSchema.index({ userId: 1, isArchived: 1 });
// "Who are the L4s at this plant?" — needed to warn when a plant has none,
// which would jam auto-issue force-closes (co-sign is plant-local).
userPlantAssignmentSchema.index({ plantId: 1, roleKey: 1, isArchived: 1 });

const UserPlantAssignmentModel: Model<IUserPlantAssignment> =
  mongoose.model<IUserPlantAssignment>(
    'UserPlantAssignment',
    userPlantAssignmentSchema,
    'userPlantAssignments'
  );

export { IUserPlantAssignment, UserPlantAssignmentModel };
