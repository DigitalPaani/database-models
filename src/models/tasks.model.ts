import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

import { taskCompletionEnums, assigneeMethodEnums, escalationUnitsEnums, communicationMediumEnums } from '../constants/taskManagementConst';

interface IWorkflowDetails extends Document {
  workflowId: Types.ObjectId;
  name: string;
  description: string;
  nodes: object[];
  edges: object[];
  transitionStatus: string;
}


interface IEscalation extends Document {
  time: number,
  unit: string,
  communicationMedium: string,
  userIds: Types.ObjectId[]
}

interface ITask extends Document {
  taskTemplateId: Types.ObjectId;
  scope: string;
  userGroupId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  assetId: Types.ObjectId;
  assignee: Types.ObjectId;
  workflowDetails: IWorkflowDetails;
  name: string;
  description: string;
  trainingVideoId?: Types.ObjectId | null; 
  priority: string;
  taskType: string;
  workflowId: Types.ObjectId;
  taskCompletion: string;
  assigneeMethod: string;
  complexity: number;
  taskDeadlineTime: number;
  taskExpectedTime: number;
  equipmentSelected: string;
  skillsSelected: Types.ObjectId[];
  dataEntry: boolean;
  sensorTag: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
  attachmentId?: Types.ObjectId | null; 
  richTextContent: string;
  escalations: IEscalation[]
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
});

const escalationSchema = new Schema({
  time: {
    type: Number,
    required: false,
  },
  unit: {
    type: String,
    enum: escalationUnitsEnums,
    required: false,
  },
  communicationMedium: {
    type: String,
    enum: communicationMediumEnums,
    required: false,
  },
  userIds: {
    type: [Types.ObjectId],
    required: false,
  }
});

const taskSchema = new Schema<ITask>(
  {
    taskTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    scope: {
      type: String,
      enum: ['SYSTEM', 'USER_GROUP'],
      required: false,
    },
    userGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
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
      type: String,
      required: false,
    },
    taskType: {
      type: String,
      required: false,
    },
    taskCompletion: {
      type: String,
      enum: taskCompletionEnums.map(taskCompletionEnum => taskCompletionEnum.value),
    },
    assigneeMethod: {
      type: String,
      enum: assigneeMethodEnums.map(assigneeMethodEnum => assigneeMethodEnum.value),
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
    sensorTag: {
      type: String,
      required: false,
    },
    richTextContent: {
      type: String,
      required: false,
    },
    escalations: {
      type: [escalationSchema],
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', taskSchema, 'tasks');

export { TaskModel, ITask };
