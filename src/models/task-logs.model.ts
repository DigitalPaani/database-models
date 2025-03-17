import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITaskLog extends Document {
  taskId: Types.ObjectId;
  url: string;
  message: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
};

const taskLogSchema = new Schema<ITaskLog>(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const TaskLogModel: Model<ITaskLog> = mongoose.model<ITaskLog>(
  "task-logs",
  taskLogSchema,
  "task-logs"
);

export { TaskLogModel, ITaskLog };
