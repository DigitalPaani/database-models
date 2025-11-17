import { Model, Types } from "mongoose";
import { IUserGroupUserRole } from "./userGroupUserRole.model";
import { INewUser } from "./newUserModel";
import { IUserGroupWorkspaceAssetUserRole } from "./userGroupWorkspaceAssetUserRole.model";
interface IUserConfigurationLogs extends Document {
    previousUserDoc?: INewUser;
    currentUserDoc?: INewUser;
    previousUserGroupUserRoleDoc?: IUserGroupUserRole[];
    currentUserGroupUserRoleDoc?: IUserGroupUserRole[];
    previousUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole[];
    currentUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole[];
    actionTakenBy: Types.ObjectId;
    action: string;
    newUserUpdatedFields?: string[];
    userGroupUserRoleUpdatedFields?: string[];
    userGroupWorkspaceAssetUserRoleUpdatedFields?: string[];
}
declare const UserConfigurationLogModel: Model<IUserConfigurationLogs>;
export { UserConfigurationLogModel, IUserConfigurationLogs };
//# sourceMappingURL=user-configuration-logs.model.d.ts.map