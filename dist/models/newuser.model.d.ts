import type { Document, Model, Types } from 'mongoose';
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
    isArchived: boolean;
    [key: string]: any;
}
declare const NewUserModel: Model<INewUser>;
export { INewUser };
export default NewUserModel;
//# sourceMappingURL=newuser.model.d.ts.map