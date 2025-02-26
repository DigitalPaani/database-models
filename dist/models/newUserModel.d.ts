import type { Document, Model, Types } from "mongoose";
interface INewUser extends Document {
    name: string;
    email: string;
    password: string;
    defaultPageId: any;
    number: string;
    userStatus: string;
    twoFactorAuthentication: boolean;
    language: string;
    profilePic: string;
    isStaff: boolean;
    parentUserId: Types.ObjectId;
    skillIds: Types.ObjectId[];
    isArchived: boolean;
    [key: string]: any;
}
declare const NewUserModel: Model<INewUser>;
export { NewUserModel, INewUser };
//# sourceMappingURL=newUserModel.d.ts.map