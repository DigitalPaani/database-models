import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

import logbookTemplateConstants from "../constants/logbook-templates.constants";
interface ILogbookTemplate extends Document {
  name: string;
  description: string;
  type: string;
  category: string;
  imageAttachmentId: Types.ObjectId | null;
  annotationIds: [Types.ObjectId];
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
      enum: logbookTemplateConstants.LOGBOOK_TEMPLATE_TYPES_ENUMS,
      default: "",
    },
    category: {
      type: String,
      enum: logbookTemplateConstants.LOGBOOK_CATEGORY_TYPES_ENUMS,
      default: "",
    },
    imageAttachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attachments",
      required: false,
    },
    annotationIds: {
      type: [mongoose.Schema.Types.ObjectId],
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
