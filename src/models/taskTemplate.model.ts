import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';


import { taskCompletionEnums, assigneeMethodEnums, escalationUnitsEnums } from '../constants/taskManagementConst';



interface ITaskTemplate extends Document {
  name: string;
  description: string;
  trainingVideoId: Types.ObjectId | null;
  priority: string;
  taskType: string;
  workflowId: Types.ObjectId;
  taskCompletion: string;
  assigneeMethod: string;
  complexity: number;
  taskDeadlineTime: IRelativeTime;
  taskExpectedTime: IRelativeTime;
  equipmentSelected: string;
  skillsSelected: Types.ObjectId[];
  dataEntry: boolean;
  sensorTag: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
  attachmentId?: Types.ObjectId | null; 
  richTextContent: string;
}

interface IRelativeTime extends Document {
  value: number;
  unit: string;
}

const relativeTimeSchema = new Schema<IRelativeTime>({
  value: {
    type: Number,
    required: false
  },
  unit: {
    type: String,
    enum: escalationUnitsEnums,
    required: false
  }
});

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
    assigneeMethod: {
        type: String,
        enum: assigneeMethodEnums.map(assigneeMethodEnum => assigneeMethodEnum.value),
    },
    complexity: {
        type: Number,
        required: true,  
    },
    taskDeadlineTime: {
        type: relativeTimeSchema,
        required: true,  
    },
    taskExpectedTime: {
        type: relativeTimeSchema,
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
    timestamps: true,
  }
);


const TaskTemplateModel: Model<ITaskTemplate> = mongoose.model<ITaskTemplate>(
  'task-templates',
  taskTemplateSchema,
  'task-templates'
);

export { TaskTemplateModel, ITaskTemplate };
