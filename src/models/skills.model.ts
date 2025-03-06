import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

import { SKILL_TYPES, SKILL_LEVELS } from '../constants/taskManagementConst';

interface ISkill extends Document {
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
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillType: {
      type: String,
      enum: SKILL_TYPES.map(skillType => skillType.value),
      required: false,
    },
    skillLevel: {
      type: String,
      enum: SKILL_LEVELS.map(skillLevel => skillLevel.value),
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

skillManagementSchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isArchived: false },
    collation: { locale: 'en', strength: 2 } // Case-insensitive collation
  }
);

const SkillManagementModel: Model<ISkill> = mongoose.model<ISkill>(
  'skill-managements',
  skillManagementSchema,
  'skill-managements'
);

export { SkillManagementModel, ISkill };
