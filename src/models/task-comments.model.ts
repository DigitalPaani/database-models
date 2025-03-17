import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITaskComment extends Document {
  taskId: Types.ObjectId;
  message: String;
  isArchived: Boolean;
  createdBy: Types.ObjectId;
}

const taskCommentSchema = new Schema<ITaskComment>(
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

const TaskCommentModel: Model<ITaskComment> = mongoose.model<ITaskComment>(
  "task-comments",
  taskCommentSchema,
  "task-comments"
);

export { TaskCommentModel, ITaskComment };
