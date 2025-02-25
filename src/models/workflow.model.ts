import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

export interface IWorkflow extends Document {
  name: string;
  description: string;
  scope: string;
  userGroupId: Types.ObjectId | null;
  nodes: object[],
  edges: object[],
  actionNodes: object[],
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const workflowSchema = new Schema<IWorkflow>(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserGroup",
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true,
    },
    nodes: {
      type: [Object],
      required: true,
    },
    edges: {
      type: [Object],
      required: true,
    },
    actionNodes: {
      type: [Object],
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

const WorkflowModel: Model<IWorkflow> = mongoose.model<IWorkflow>(
  'workflows',
  workflowSchema,
  'workflows'
);

export { WorkflowModel };
