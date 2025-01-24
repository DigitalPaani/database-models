import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface Roster extends Document {
  name: string;
  description: string;
  userGroupId: Types.ObjectId;
  assetIds: Types.ObjectId[]
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const rosterManagementSchema = new Schema<Roster>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userGroupId: {
        type: Types.ObjectId,
        required: true,
    } as any,
    assetIds: {
        type: [Types.ObjectId],
        required: true,
    } as any,
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    createdBy: {
      type: Types.ObjectId,
      required: false,
    } as any,
  },
  {
    timestamps: true,
  }
);


const RosterManagementModel: Model<Roster> = mongoose.model<Roster>(
  'rosters',
  rosterManagementSchema,
  'rosters'
);

export { RosterManagementModel };
