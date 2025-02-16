import type { Document, Model } from 'mongoose';
import mongoose from 'mongoose';
interface IRoster extends Document {
    name: string;
    description: string;
    userGroupId: mongoose.Schema.Types.ObjectId;
    assetIds: mongoose.Schema.Types.ObjectId[];
    isArchived: boolean;
    managementUserId: mongoose.Schema.Types.ObjectId | null;
    createdBy: mongoose.Schema.Types.ObjectId;
}
declare const RosterManagementModel: Model<IRoster>;
export { RosterManagementModel, IRoster };
//# sourceMappingURL=roster.model.d.ts.map