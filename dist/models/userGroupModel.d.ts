import type { Document, Model, Types } from "mongoose";
import type { IPlant } from "./plantModel";
import type { IWorkspace } from "./workspaceModel";
import type { INewUser } from "./newUserModel";
interface IWorkspaceAssets {
    workspaceId: Types.ObjectId | IWorkspace;
    assetIds: Types.ObjectId[] | IPlant[];
}
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
declare const UserGroupModel: Model<IUserGroup>;
export { IUserGroup, IWorkspaceAssets, UserGroupModel };
//# sourceMappingURL=userGroupModel.d.ts.map