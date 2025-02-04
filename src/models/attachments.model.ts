import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface IAttachment extends Document {
  attachmentLink: string;
  filename: string;
  expireAt: Date | null;
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
    expireAt: {
      type: Date,
      required: false, // If we don't want the document to expire, we can set it to null
    }
  },
  {
    timestamps: true,
    minimize: false
  }
);

// Expire documents after 1 Day
attachmentSchema.index({ expireAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const AttachmentModel: Model<IAttachment> = mongoose.model<IAttachment>(
  'attachments',
  attachmentSchema,
  'attachments'
);

export { AttachmentModel, IAttachment };
