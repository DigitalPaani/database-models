import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';
require('./newUserModel');

import { TASK_COMPLETION_ENUMS, ASSIGNEE_METHOD_ENUMS, ESCALATION_UNITS_ENUMS, COMMUNICATION_MEDIUM_ENUMS } from '../constants/taskManagementConst';

interface IWorkflowDetails extends Document {
  workflowId: Types.ObjectId;
  name: string;
  description: string;
  nodes: object[];
  edges: object[];
  transitionStatus: string;
}

interface IEscalation extends Document {
  timeInMinutes: number,
  communicationMedium: string,
  userIds: Types.ObjectId[]
  isNotified: boolean;
}

interface IActionNode extends Document {
  id: string;
  label: string;
  selectedAction: string;
  selectedActionValue: string;
  actionIds: Types.ObjectId[];
}

interface IComponentActions extends Document {
  nodeId: string,
  actionNodes: IActionNode[]
}

interface ITask extends Document {
  triggerId: Types.ObjectId;
  taskTemplateId: Types.ObjectId;
  userGroupId: Types.ObjectId | null;
  workspaceId: Types.ObjectId;
  assetId: Types.ObjectId | null;
  assignee: Types.ObjectId;
  workflowDetails: IWorkflowDetails;
  name: string;
  description: string;
  trainingVideoId?: Types.ObjectId | null; 
  priority: number;
  taskType: string;
  workflowId: Types.ObjectId;
  taskCompletion: string;
  assigneeMethod: string;
  taskCompletionState: string | null;
  complexity: number;
  taskDeadlineTime: number;
  taskExpectedTime: number;
  taskCompletionTime: number;
  equipmentSelected: string;
  skillsSelected: Types.ObjectId[];
  dataEntry: boolean;
  sensorId: Types.ObjectId | null; 
  isArchived: boolean;
  createdBy: Types.ObjectId | null; 
  attachmentId?: Types.ObjectId | null; 
  richTextContent: string;
  taskCompleted: boolean;
  escalations: IEscalation[]
  isObsolete: boolean;
  taskComponentId: Types.ObjectId;
  componentActions: IComponentActions[]
}

const workflowDetailsSchema = new Schema<IWorkflowDetails>({
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workflows',
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nodes: {
    type: [Object],
    required: false,
  },
  edges: {
    type: [Object],
    required: false,
  },
  transitionStatus: {
    type: String,
    required: false,
  },
}, { _id: false });

const escalationSchema = new Schema<IEscalation>({
  timeInMinutes: {
    type: Number,
    required: false,
  },
  communicationMedium: {
    type: String,
    enum: COMMUNICATION_MEDIUM_ENUMS,
    required: false,
  },
  userIds: {
    type: [Types.ObjectId],
    ref: "NewUser",
    required: false,
  },
  isNotified: { type: Boolean, default: false },
}, { _id: false });

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
  },
  actionIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false
  }
}, { _id: false });

const componentActionSchema = new Schema<IComponentActions>({
    nodeId: {
      type: String,
      required: false,
    },
    actionNodes: {
      type: [actionNodeSchema],
      required: false
    }
}, { _id: false });

const taskSchema = new Schema<ITask>(
  {
    triggerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    taskTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    userGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: false,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: false,
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    workflowDetails: {
      type: workflowDetailsSchema,
      required: false
    },   
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    trainingVideoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'attachments',
      required: false,
    },
    priority: {
      type: Number,
      required: false,
    },
    taskType: {
      type: String,
      required: false,
    },
    taskCompletion: {
      type: String,
      enum: TASK_COMPLETION_ENUMS.map(taskCompletionEnum => taskCompletionEnum.value),
    },
    assigneeMethod: {
      type: String,
      enum: ASSIGNEE_METHOD_ENUMS.map(assigneeMethodEnum => assigneeMethodEnum.value),
    },
    taskCompletionState: {
      type: String,
      required: false
    },
    complexity: {
      type: Number,
      required: false,
    },
    taskDeadlineTime: {
      type: Number,
      required: false,
    },
    taskExpectedTime: {
      type: Number,
      required: false,
    },
    taskCompletionTime: {
      type: Number,
      required: false,
    },
    equipmentSelected: {
      type: String,
      required: false,
    },
    skillsSelected: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'skill-managements',
      required: false,
    },
    dataEntry: {
      type: Boolean,
      default: false,
      required: false,
    },
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    richTextContent: {
      type: String,
      required: false,
    },
    escalations: {
      type: [escalationSchema],
      required: false,
    },
    componentActions: {
      type: [componentActionSchema],
      required: false,
    },
    isObsolete: {
      type: Boolean,
      default: false
    },
    taskComponentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    taskCompleted: {
      type: Boolean,
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    }
  },
  {
    timestamps: true,
    minimize: false
  }
);

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', taskSchema, 'tasks');

export { TaskModel, ITask, IEscalation, IWorkflowDetails };
