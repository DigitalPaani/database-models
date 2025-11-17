import type { Document, Model, Types } from 'mongoose';
interface IUserGroupUserRole extends Document {
    userGroupId: Types.ObjectId;
    userId: Types.ObjectId;
    roleId: Types.ObjectId;
}
declare const UserGroupUserRoleModel: Model<IUserGroupUserRole>;
export { IUserGroupUserRole, UserGroupUserRoleModel };
//# sourceMappingURL=userGroupUserRole.model.d.ts.map