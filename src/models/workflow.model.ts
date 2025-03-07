import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IActionNode {
  id: string;
  label: string;
  selectedAction: string;
  selectedActionValue: string;
}

interface IWorkflowActions {
  nodeId: string,
  nodeLabel: string,
  actionNodes: IActionNode[]
}

interface IWorkflow extends Document{
  name: string;
  description: string;
  scope: string;
  userGroupId: Types.ObjectId | null;
  nodes: object[],
  edges: object[],
  workflowActions: IWorkflowActions[],
  isArchived: boolean;
  createdBy: Types.ObjectId;
}



const actionNodeSchema = new Schema<IActionNode>({
  id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  selectedAction: {
    type: String,
    required: false,
  },
  selectedActionValue: {
    type: String,
    required: false,
  }
});

const workflowActionSchema = new Schema<IWorkflowActions>({
  nodeId: {
    type: String,
    required: false,
  },
  nodeLabel: {
    type: String,
    required: false,
  },
  actionNodes: {
    type: [actionNodeSchema],
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
      default: null
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
    workflowActions: {
      type: [workflowActionSchema],
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const WorkflowModel: Model<IWorkflow> = mongoose.model<IWorkflow>(
  'workflows',
  workflowSchema,
  'workflows'
);

export { WorkflowModel, IWorkflow, IWorkflowActions, IActionNode };
