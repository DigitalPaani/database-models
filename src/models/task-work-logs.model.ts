import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITaskWorkLog extends Document {
  taskId: Types.ObjectId;
  message: String;
  isArchived: Boolean;
  createdBy: Types.ObjectId;
};

const taskWorkLogSchema = new Schema<ITaskWorkLog>(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

const TaskWorkLogModel: Model<ITaskWorkLog> = mongoose.model<ITaskWorkLog>(
  "task-work-logs",
  taskWorkLogSchema,
  "task-work-logs"
);

export { TaskWorkLogModel, ITaskWorkLog };
