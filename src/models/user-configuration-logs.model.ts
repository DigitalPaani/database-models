import mongoose, { Model, Schema, Types } from "mongoose";
import { IUserGroupUserRole, UserGroupUserRoleModel } from "./userGroupUserRole.model";
import { INewUser, NewUserModel } from "./newUserModel";
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

const newUserSubSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    ...NewUserModel.schema.obj
  },
  { _id: false }
);
const userGroupUserRoleSubSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    ...UserGroupUserRoleModel.schema.obj
  },
  { _id: false }
);
const userGroupWorkspaceAssetUserRoleSubSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    ...UserGroupWorkspaceAssetUserRoleModel.schema.obj
  },
  { _id: false }
);

const UserConfigurationSchema = new Schema<IUserConfigurationLogs>(
  {
    previousUserDoc: {
      type: newUserSubSchema,
      required: false,
      default: undefined,
    },
    currentUserDoc: {
      type: newUserSubSchema,
      required: false,  
      default: undefined,
    },
    previousUserGroupUserRoleDoc: {
      type: [userGroupUserRoleSubSchema],
      required: false,
      default: undefined,
    },
    currentUserGroupUserRoleDoc: {
      type: [userGroupUserRoleSubSchema],
      required: false,
      default: undefined,
    },
    previousUserGroupWorkspaceAssetUserRoleDoc: {
      type: [userGroupWorkspaceAssetUserRoleSubSchema],
      required: false,
      default: undefined,
    },
    currentUserGroupWorkspaceAssetUserRoleDoc: {
      type: [userGroupWorkspaceAssetUserRoleSubSchema],
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
