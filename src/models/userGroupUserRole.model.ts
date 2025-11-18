import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IUserGroupUserRole extends Document {
  userGroupId: Types.ObjectId;
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

const userRoleSchema = new Schema<IUserGroupUserRole>(
  {
    userGroupId: { type: Schema.Types.ObjectId, ref: 'UserGroup', required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true }
);

// Compound indexes
userRoleSchema.index({ userId: 1, roleId: 1 });
userRoleSchema.index({ roleId: 1, userId: 1 });

// userGroupUserRoleSchema.index({ userId: 1, userGroupId: 1 });
// userGroupUserRoleSchema.index({ roleId: 1, userGroupId: 1 });

const UserGroupUserRoleModel: Model<IUserGroupUserRole> = mongoose.model<IUserGroupUserRole>(
  'UserGroupUserRole',
  userRoleSchema,   
  'userGroup-user-role'
);

export { IUserGroupUserRole, UserGroupUserRoleModel };
