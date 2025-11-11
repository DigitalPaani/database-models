import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IUserGroupWorkspaceAssetUserRole extends Document {
  userGroupId: Types.ObjectId;
  assetId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

const userGroupWorkspaceAssetUserRoleSchema =
  new Schema<IUserGroupWorkspaceAssetUserRole>(
    {
      userGroupId: {
        type: Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
      },
      assetId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
      workspaceId: {
        type: Schema.Types.ObjectId,
        ref: "NewWorkspace",
        required: true,
      },
      userId: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
      roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    },
    { timestamps: true }
  );

userGroupWorkspaceAssetUserRoleSchema.index(
  { userGroupId: 1, assetId: 1, workspaceId: 1, userId: 1, roleId: 1 },
  { unique: true }
);

const UserGroupWorkspaceAssetUserRoleModel: Model<IUserGroupWorkspaceAssetUserRole> =
  mongoose.model<IUserGroupWorkspaceAssetUserRole>(
    "UserGroupWorkspaceAssetUserRole",
    userGroupWorkspaceAssetUserRoleSchema,
    "userGroup-workspace-asset-user-role"
  );

export { IUserGroupWorkspaceAssetUserRole, UserGroupWorkspaceAssetUserRoleModel };
