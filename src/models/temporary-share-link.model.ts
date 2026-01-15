import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';


interface ITemporaryShareLinksModel extends Document {
  url: string;
  shortToken: string;
  type: string;
  insightId: Types.ObjectId;
  expiresAt: Date;
  isArchived: boolean;
}

const TemporaryShareLinkSchema = new Schema<ITemporaryShareLinksModel>(
  {
    url: {
      type: String,
      required: true,
    },
    shortToken: {
      type: String,
      required: true,
    },
    type: {
       type: String,
       enum: ["INSIGHT"] 
    },
    insightId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    expiresAt: {
      type: Date,
      required: true
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

TemporaryShareLinkSchema.index(
  { expiresAt: 1 }, // MongoDB will delete the document as soon as expiresAt is reached.
  { expireAfterSeconds: 0 }
);

const TemporaryShareLinksModel: Model<ITemporaryShareLinksModel> = mongoose.model<ITemporaryShareLinksModel>(
  'temporary-share-links',
  TemporaryShareLinkSchema,
  'temporary-share-links'
);

export { TemporaryShareLinksModel, ITemporaryShareLinksModel };
