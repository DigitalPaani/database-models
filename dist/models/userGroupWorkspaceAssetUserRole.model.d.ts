import type { Document, Model, Types } from "mongoose";
interface IUserGroupWorkspaceAssetUserRole extends Document {
    userGroupId: Types.ObjectId;
    assetId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    userId: Types.ObjectId;
    roleId: Types.ObjectId;
}
declare const UserGroupWorkspaceAssetUserRoleModel: Model<IUserGroupWorkspaceAssetUserRole>;
export { IUserGroupWorkspaceAssetUserRole, UserGroupWorkspaceAssetUserRoleModel };
//# sourceMappingURL=userGroupWorkspaceAssetUserRole.model.d.ts.map