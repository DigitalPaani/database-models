import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface ISkill extends Document {
    name: string;
    description: string;
    skillType: string;
    skillLevel: string;
    isArchived: boolean;
    createdBy: Types.ObjectId;
}
declare const SkillManagementModel: Model<ISkill>;
export { SkillManagementModel, ISkill };
//# sourceMappingURL=skills.model.d.ts.map