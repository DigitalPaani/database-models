import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import commonConstants from "../constants/commonConstants";

interface IObsoleteTask extends Document {
  taskTemplateId: Types.ObjectId;
  triggerIds: Types.ObjectId[];
  conditionType: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const obsoleteTaskSchema = new Schema<IObsoleteTask>(
  {
    taskTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "task-templates",
      required: true,
    },
    triggerIds: {
      type: [Schema.Types.ObjectId],
      ref: "triggers",
      required: true,
    },
    conditionType: {
      type: String,
      enum: Object.values(commonConstants.OBSOLETE_CONDITIONS),
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ObsoleteTaskModel: Model<IObsoleteTask> = mongoose.model<IObsoleteTask>(
  "obsoleteTasks",
  obsoleteTaskSchema,
  "obsoleteTasks"
);

export { ObsoleteTaskModel, IObsoleteTask };
