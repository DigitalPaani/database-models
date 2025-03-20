import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';
require('./newUserModel');

import { TASK_COMPLETION_ENUMS, ASSIGNEE_METHOD_ENUMS, COMMUNICATION_MEDIUM_ENUMS, TASK_TYPES } from '../constants/taskManagementConst';

interface IWorkflowDetails extends Document {
  workflowId: Types.ObjectId;
  name: string;
  description: string;
  nodes: object[];
  edges: object[];
  workflowActions: object[];
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
  assignee: Types.ObjectId | null;
  workflowDetails: IWorkflowDetails;
  name: string;
  description: string;
  trainingVideoId?: Types.ObjectId | null; 
  priority: number;
  taskType: string;
  workflowId: Types.ObjectId;
  taskCompletion: string;
  assigneeMethod: string;
  emergencyTaskCommonId: string;
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

interface IWorkflowActionNode extends Document {
  id: string;
  label: string;
  selectedAction: string;
  selectedActionValue: string;
  actionCompleted: boolean
}

interface IWorkflowAction extends Document {
  nodeId: string,
  nodeLabel: string,
  actionNodes: IWorkflowActionNode[]
}

const workflowActionNodeSchema = new Schema<IWorkflowActionNode>({
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
  actionCompleted: {
    type: Boolean,
    required: false
  },
}, { _id: false });

const workflowActionSchema = new Schema<IWorkflowAction>({
  nodeId: {
    type: String,
    required: true,
  },
  nodeLabel: {
    type: String,
    required: true,
  },
  actionNodes: {
    type: [workflowActionNodeSchema],
    required: false
  }
}, { _id: false });


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
  workflowActions: {
    type: [workflowActionSchema],
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
      default: null
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    workflowDetails: {
      type: workflowDetailsSchema,
      required: true
    },   
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ""
    },
    trainingVideoId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'attachments',
      default: null
    },
    priority: {
      type: Number,
      required: false,
    },
    taskType: {
      type: String,
      enum: TASK_TYPES.map(taskType => taskType.value),
      required: true,
    },
    taskCompletion: {
      type: String,
      enum: TASK_COMPLETION_ENUMS.map(taskCompletionEnum => taskCompletionEnum.value),
      required: true
    },
    assigneeMethod: {
      type: String,
      enum: ASSIGNEE_METHOD_ENUMS.map(assigneeMethodEnum => assigneeMethodEnum.value),
      required: true
    },
    emergencyTaskCommonId: {
      type: String,
      default: null
    },
    taskCompletionState: {
      type: String,
      default: null
    },
    complexity: {
      type: Number,
      required: true,
    },
    taskDeadlineTime: {
      type: Number,
      required: true,
    },
    taskExpectedTime: {
      type: Number,
      required: true,
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
      default: []
    },
    dataEntry: {
      type: Boolean,
      default: false,
    },
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
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
      default: false,
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
