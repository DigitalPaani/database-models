import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITaskUploadMedia extends Document {
  taskId: Types.ObjectId;
  url: String;
  isArchived: Boolean;
  createdBy: Types.ObjectId;
}

const taskUploadMediaSchema = new Schema<ITaskUploadMedia>(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    url: {
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

const TaskUploadMediaModel: Model<ITaskUploadMedia> =
  mongoose.model<ITaskUploadMedia>(
    "task-upload-media",
    taskUploadMediaSchema,
    "task-upload-media"
  );

export { TaskUploadMediaModel, ITaskUploadMedia };
