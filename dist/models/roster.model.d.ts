import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface IRoster extends Document {
    name: string;
    description: string;
    userGroupId: Types.ObjectId;
    assetIds: Types.ObjectId[];
    isArchived: boolean;
    managementUserId: Types.ObjectId | null;
    createdBy: Types.ObjectId;
}
declare const RosterManagementModel: Model<IRoster>;
export { RosterManagementModel, IRoster };
//# sourceMappingURL=roster.model.d.ts.map