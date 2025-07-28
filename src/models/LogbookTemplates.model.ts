import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ILogbookTemplate extends Document {
  name: string;
  description: string;
  type: string;
  category: string;
  imageAttachmentId: Types.ObjectId | null;
  isArchived: boolean;
}

const LogbookTemplateSchema = new Schema<ILogbookTemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["LOGBOOK", "INVENTORY"],
      default: "",
    },
    category: {
      type: String,
      enum: ["CATEGORY-1", "CATEGORY-2"],
      default: "",
    },
    imageAttachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const LogbookTemplateModel: Model<ILogbookTemplate> =
  mongoose.model<ILogbookTemplate>(
    "logbookTemplates",
    LogbookTemplateSchema,
    "logbookTemplates"
  );

export { LogbookTemplateModel, ILogbookTemplate };
