import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITaskLog extends Document {
  taskId: Types.ObjectId;
  transitionedTo: string;
  url: string;
  message: string;
  type: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
};

const taskLogSchema = new Schema<ITaskLog>(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    transitionedTo: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["RCA", "MEDIA"]
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
