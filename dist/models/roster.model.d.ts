import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
export interface IRoster extends Document {
    name: string;
    description: string;
    userGroupId: Types.ObjectId;
    assetIds: Types.ObjectId[];
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const RosterManagementModel: Model<IRoster>;
export { RosterManagementModel };
//# sourceMappingURL=roster.model.d.ts.map