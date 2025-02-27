import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';


import { taskCompletionEnums, assigneeMethodEnums, escalationUnitsEnums } from '../constants/taskManagementConst';



interface ITaskTemplate extends Document {
  name: string;
  description: string;
  trainingVideoId: Types.ObjectId | null;
  scope: string;
  userGroupId: Types.ObjectId | null;
  priority: string;
  taskType: string;
  workflowId: Types.ObjectId;
  taskCompletion: string;
  taskCompletionState: string;
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

const taskTemplateSchema = new Schema<ITaskTemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trainingVideoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    scope: {
      type: String,
      enum: ['SYSTEM', 'USER_GROUP'],
      required: true,
    },
    userGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attachments",
      required: false,
    },
    priority: {
      type: String,
      required: true,
    },
    taskType: {
      type: String,
      required: true,
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workflows",
      required: true,
    },
    taskCompletion: {
      type: String,
      enum: taskCompletionEnums.map(taskCompletionEnum => taskCompletionEnum.value),
    },
    taskCompletionState: {
      type: String,
      required: false
    },
    assigneeMethod: {
        type: String,
        enum: assigneeMethodEnums.map(assigneeMethodEnum => assigneeMethodEnum.value),
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
    equipmentSelected: {
        type: String,
        required: false,
    },
    skillsSelected: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "skill-managements",
        required: true,
    },
    dataEntry: {
        type: Boolean,
        default: false,
        required: true,
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
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);


const TaskTemplateModel: Model<ITaskTemplate> = mongoose.model<ITaskTemplate>(
  'task-templates',
  taskTemplateSchema,
  'task-templates'
);

export { TaskTemplateModel, ITaskTemplate };
