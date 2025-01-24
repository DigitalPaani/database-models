import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';


import { taskCompletionEnums, assigneeMethodEnums } from '../constants/taskManagementConst';



interface TaskTemplate extends Document {
  name: string;
  description: string;
  trainingVideoId: Types.ObjectId | null;
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
  attachmentId: Types.ObjectId;
}




const taskTemplateSchema = new Schema<TaskTemplate>(
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
      type: Types.ObjectId,
      required: true,
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
    } as any,
    isArchived: {
      type: Boolean,
      default: false,
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


const TaskTemplateModel: Model<TaskTemplate> = mongoose.model<TaskTemplate>(
  'task-templates',
  taskTemplateSchema,
  'task-templates'
);

export { TaskTemplateModel };
