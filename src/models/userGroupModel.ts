import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { IPlant } from "./plantModel";
import type { IWorkspace } from "./workspaceModel";
import type { INewUser } from "./newUserModel";

// Define a TypeScript interface for the WorkspaceAssets structure
interface IWorkspaceAssets {
  workspaceId: Types.ObjectId | IWorkspace;
  assetIds: Types.ObjectId[] | IPlant[];
}

// Define a TypeScript interface for the UserGroup document
interface IUserGroup extends Document {
  name: string;
  description: string;
  createdBy: Types.ObjectId;
  userIds: Types.ObjectId[] | INewUser[];
  featureTags: string[];
  workspaceAssets: IWorkspaceAssets[];
  isArchived: boolean;
  abbr: string;
}

// Define the schema using the TypeScript interface
const workspaceAssetsSchema = new Schema<IWorkspaceAssets>(
  {
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: "NewWorkspace",
      required: true,
    },
    assetIds: { type: [Schema.Types.ObjectId], ref: "Plant", default: [] },
  },
  { _id: false }
);

// Define the schema using the TypeScript interface
const userGroupSchema = new Schema<IUserGroup>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "", required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
    userIds: { type: [Schema.Types.ObjectId], ref: "NewUser", default: [] },
    featureTags: { type: [String], default: [] },
    workspaceAssets: { type: [workspaceAssetsSchema], default: [] },
    isArchived: { type: Boolean, default: false },
    abbr: { type: String, required: false, unique: false },
  },
  { timestamps: true }
);

// Create a compound index to ensure unique group name
userGroupSchema.index({ name: 1, createdBy: 1 }, { unique: true });

// Define the model using the schema and the TypeScript interface
const UserGroupModel: Model<IUserGroup> = mongoose.model<IUserGroup>(
  "UserGroup",
  userGroupSchema,
  "userGroups"
);

export { IUserGroup, IWorkspaceAssets };

export default UserGroupModel;
