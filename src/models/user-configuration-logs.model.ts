import mongoose, { Model, Schema, Types } from "mongoose";
import { IUserGroupUserRole } from "./userGroupUserRole.model";
import { INewUser, NewUserModel } from "./newUserModel";
import { IUserGroupWorkspaceAssetUserRole, UserGroupWorkspaceAssetUserRoleModel } from "./userGroupWorkspaceAssetUserRole.model";
import { UserGroupModel } from "./userGroupModel";
import { USER_CONFIG_LOGS_ACTION_ENUM } from "../constants/user-configuration-logs.constants";

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

const UserConfigurationSchema = new Schema<IUserConfigurationLogs>(
  {
    previousUserDoc: {
      type: NewUserModel.schema,
      required: false,
      default: {}
    },
    currentUserDoc: {
      type: NewUserModel.schema,
      required: false,
      default: {}
    },
    previousUserGroupUserRoleDoc: {
      type: UserGroupModel.schema,
      required: false,
      default: {}
    },
    currentUserGroupUserRoleDoc: {
      type: UserGroupModel.schema,
      required: false,
      default: {}
    },
    previousUserGroupWorkspaceAssetUserRoleDoc: {
      type: UserGroupWorkspaceAssetUserRoleModel.schema,
      required: false,
      default: {}
    },
    currentUserGroupWorkspaceAssetUserRoleDoc: {
      type: UserGroupWorkspaceAssetUserRoleModel.schema,
      required: false,
      default: {}
    },
    actionTakenBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'NewUser'
    },
    action: {
      type: String,
      enum: Object.values(USER_CONFIG_LOGS_ACTION_ENUM),
    },
    updatedFields: {
      type: {
        newUserUpdatedFields: [String],
        userGroupUserRoleUpdatedFields: [String],
        userGroupWorkspaceAssetUserRoleUpdatedFields: [String]
      },
      required: false
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const UserConfigurationModel: Model<IUserConfigurationLogs> = mongoose.model<IUserConfigurationLogs>(
  "userConfigurationLogs",
  UserConfigurationSchema,
  "user-configuration-logs"
);

export { UserConfigurationModel, IUserConfigurationLogs };
