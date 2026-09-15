import type { Document, Model, Types } from 'mongoose';
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
declare const UserPlantAssignmentModel: Model<IUserPlantAssignment>;
export { IUserPlantAssignment, UserPlantAssignmentModel };
//# sourceMappingURL=userPlantAssignment.model.d.ts.map