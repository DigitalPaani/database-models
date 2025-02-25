import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IWorkflow extends Document {
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

interface IActionNode {
  nodeId: string,
  actionNode: object
}

interface IActionNodeDocument extends Document {
  nodeId: string,
  actionNode: object
}


const actionNodeSchema = new Schema<IActionNodeDocument>({
  nodeId: {
    type: String,
    required: false,
  },
  actionNode: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

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
      type: [actionNodeSchema],
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

export { WorkflowModel, IWorkflow, IActionNode };
