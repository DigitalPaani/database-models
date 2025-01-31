import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';




import { skillTypes, skillLevels } from '../constants/taskManagementConst';

export interface ISkill extends Document {
  name: string;
  description: string;
  skillType: string;
  skillLevel: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const skillManagementSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillType: {
      type: String,
      enum: skillTypes.map(skillType => skillType.value),
      required: false,
    },
    skillLevel: {
      type: String,
      enum: skillLevels.map(skillLevel => skillLevel.value),
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    createdBy: {
      type: Types.ObjectId,
      required: false,
    } as any,
  },
  {
    timestamps: true,
  }
);

skillManagementSchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isArchived: false }
  }
);

const SkillManagementModel: Model<ISkill> = mongoose.model<ISkill>(
  'skill-managements',
  skillManagementSchema,
  'skill-managements'
);

export { SkillManagementModel };
