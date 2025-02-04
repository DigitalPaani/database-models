import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';


import { taskCompletionEnums, assigneeMethodEnums } from '../constants/taskManagementConst';



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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
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
