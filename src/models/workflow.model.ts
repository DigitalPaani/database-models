import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface Workflow extends Document {
  name: string;
  description: string;
  scope: string;
  userGroupId: Types.ObjectId | null;
  nodes: object,
  edges: object,
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const workflowSchema = new Schema<Workflow>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      enum: ['SYSTEM', 'USER_GROUP'],
      required: true,
    },
    userGroupId: {
      type: Types.ObjectId,
      ref: "UserGroup",
      required: false,
    } as any,
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
    nodes: {
      type: Object,
      required: false,
    },
    edges: {
      type: Object,
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

const WorkflowModel: Model<Workflow> = mongoose.model<Workflow>(
  'workflows',
  workflowSchema,
  'workflows'
);

export { WorkflowModel };
