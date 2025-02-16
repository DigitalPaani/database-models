import type { Document, Model } from 'mongoose';
import { Schema } from 'mongoose';
interface IRoster extends Document {
    name: string;
    description: string;
    userGroupId: Schema.Types.ObjectId;
    assetIds: Schema.Types.ObjectId[];
    isArchived: boolean;
    managementUserId: Schema.Types.ObjectId | null;
    createdBy: Schema.Types.ObjectId;
}
declare const RosterManagementModel: Model<IRoster>;
export { RosterManagementModel, IRoster };
//# sourceMappingURL=roster.model.d.ts.map