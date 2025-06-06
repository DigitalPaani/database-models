import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
require("./newUserModel");

interface ITransitionDetails extends Document {
  id: string;
  value: string;
}

interface ITaskLog extends Document {
  taskId: Types.ObjectId;
  actionId: string | null;
  transitionFrom: ITransitionDetails;
  transitionTo: ITransitionDetails;
  url: string;
  filename: string;
  mimetype: string;
  message: string;
  type: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const transitionSchema = new Schema<ITransitionDetails>({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const taskLogSchema = new Schema<ITaskLog>(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    actionId: {
      type: String,
      default: null,
    },
    transitionFrom: {
      type: transitionSchema,
      required: true,
    },
    transitionTo: {
      type: transitionSchema,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
    filename: {
      type: String,
      default: null,
    },
    mimetype: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["RCA", "MEDIA", "COMMUNICATION", "CREATE_SUB_TASK", "ASSIGN_TO_A_DIFFERENT_USER"],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
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
