import { Model, Types } from "mongoose";
import { IUserGroupUserRole } from "./userGroupUserRole.model";
import { INewUser } from "./newUserModel";
import { IUserGroupWorkspaceAssetUserRole } from "./userGroupWorkspaceAssetUserRole.model";
export interface updatedFields {
    newUserUpdatedFields: string[];
    userGroupUserRoleUpdatedFields: string[];
    userGroupWorkspaceAssetUserRoleUpdatedFields: string[];
}
interface IUserConfigurationLogs extends Document {
    previousUserDoc?: INewUser;
    currentUserDoc?: INewUser;
    previousUserGroupUserRoleDoc?: IUserGroupUserRole;
    currentUserGroupUserRoleDoc?: IUserGroupUserRole;
    previousUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole;
    currentUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole;
    actionTakenBy: Types.ObjectId;
    action: string;
    updatedFields?: updatedFields;
}
declare const UserConfigurationModel: Model<IUserConfigurationLogs>;
export { UserConfigurationModel, IUserConfigurationLogs };
//# sourceMappingURL=user-configuration-logs.model.d.ts.map