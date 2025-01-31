import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IAttachment extends Document {
  attachmentLink: string;
  filename: string;
  neverExpire: boolean;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    attachmentLink: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      required: false,
    },
    neverExpire: {
      type: Boolean,
      default: false, // Default is false, meaning it will expire
    },
  },
  {
    timestamps: true,
  }
);

// Expire documents after 30 minutes
// attachmentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 60 });

const AttachmentModel: Model<IAttachment> = mongoose.model<IAttachment>(
  'attachments',
  attachmentSchema,
  'attachments'
);

export { AttachmentModel, IAttachment };
