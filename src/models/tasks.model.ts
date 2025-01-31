import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

import { taskCompletionEnums, assigneeMethodEnums } from '../constants/taskManagementConst';

interface IWorkflowDetails extends Document {
  workflowId: Types.ObjectId;
  status: string;
}

interface ITask extends Document {
  taskTemplateId: Types.ObjectId;
  scope: string;
  userGroupId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  assetIds: Types.ObjectId[];
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
}

const workflowDetailsSchema = new Schema<IWorkflowDetails>({
  workflowId: {
    type: Types.ObjectId,
    required: false
  } as any,
  status: {
    type: String,
    required: false
  }
});

const taskSchema = new Schema<ITask>(
  {
    taskTemplateId: {
      type: Types.ObjectId,
      required: false,
    } as any,
    scope: {
      type: String,
      enum: ['SYSTEM', 'USER_GROUP'],
      required: false,
    },
    userGroupId: {
      type: Types.ObjectId,
      required: false,
    } as any,
    workspaceId: {
      type: Types.ObjectId,
      required: false,
    } as any,
    assetIds: {
      type: [Types.ObjectId],
      required: false,
    } as any,
    assignee: {
      type: Types.ObjectId,
      required: false,
    } as any,
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
      type: Types.ObjectId,
      required: false,
    } as any,
    attachmentId: {
      type: Types.ObjectId,
      ref: 'attachments',
      required: false,
    } as any,
    priority: {
      type: String,
      required: true,
    },
    taskType: {
      type: String,
      required: true,
    },
    workflowId: {
      type: Types.ObjectId,
      ref: 'workflows',
      required: true,
    } as any,
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
      type: [Types.ObjectId],
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

export { TaskModel };
