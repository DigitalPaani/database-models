import mongoose, { Model, Schema, Types } from "mongoose";
import { IUserGroupUserRole, UserGroupUserRoleModel } from "./userGroupUserRole.model";
import { INewUser } from "./newUserModel";
import { IUserGroupWorkspaceAssetUserRole, UserGroupWorkspaceAssetUserRoleModel } from "./userGroupWorkspaceAssetUserRole.model";
import { LOGS_ACTION_ENUM } from "../constants/logs.constants";

export interface IUpdatedFields {
  newUserUpdatedFields: string[];
  userGroupUserRoleUpdatedFields: string[];
  userGroupWorkspaceAssetUserRoleUpdatedFields: string[];
}
interface IUserConfigurationLogs extends Document {
  previousUserDoc?: INewUser;
  currentUserDoc?: INewUser;
  previousUserGroupUserRoleDoc?: IUserGroupUserRole[];
  currentUserGroupUserRoleDoc?: IUserGroupUserRole[];
  previousUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole[];
  currentUserGroupWorkspaceAssetUserRoleDoc?: IUserGroupWorkspaceAssetUserRole[];
  actionTakenBy: Types.ObjectId;
  action: string;
  updatedFields?: IUpdatedFields;
}

const newUserSchema = new Schema<INewUser>({}, { _id: false });
const newUserModel = mongoose.model("NewUser", newUserSchema);

const userGroupUserRoleSchema = new Schema<IUserGroupUserRole>({}, {_id: false});
const userGroupUserRoleModel = mongoose.model("UserGroupUserRole", userGroupUserRoleSchema);

const userGroupWorkspaceAssetUserRoleSchema = new Schema<IUserGroupWorkspaceAssetUserRole>({}, {_id: false});
const userGroupWorkspaceAssetUserRoleModel = mongoose.model("UserGroupWorkspaceAssetUserRole", userGroupWorkspaceAssetUserRoleSchema);



const UserConfigurationSchema = new Schema<IUserConfigurationLogs>(
  {
    previousUserDoc: {
      type: newUserModel,
      required: false,
      default: undefined,
    },
    currentUserDoc: {
      type: newUserModel,
      required: false,  
      default: undefined,
    },
    previousUserGroupUserRoleDoc: {
      type: [userGroupUserRoleModel],
      required: false,
      default: undefined,
    },
    currentUserGroupUserRoleDoc: {
      type: [userGroupUserRoleModel],
      required: false,
      default: undefined,
    },
    previousUserGroupWorkspaceAssetUserRoleDoc: {
      type: [userGroupWorkspaceAssetUserRoleModel],
      required: false,
      default: undefined,
    },
    currentUserGroupWorkspaceAssetUserRoleDoc: {
      type: [userGroupWorkspaceAssetUserRoleModel],
      required: false,
      default: undefined,
    },
    actionTakenBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:'NewUser'
    },
    action: {
      type: String,
      enum: Object.values(LOGS_ACTION_ENUM),
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

const UserConfigurationLogModel: Model<IUserConfigurationLogs> = mongoose.model<IUserConfigurationLogs>(
  "userConfigurationLogs",
  UserConfigurationSchema,
  "user-configuration-logs"
);

export { UserConfigurationLogModel, IUserConfigurationLogs };
