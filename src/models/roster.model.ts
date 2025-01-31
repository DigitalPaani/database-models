import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

export interface IRoster extends Document {
  name: string;
  description: string;
  userGroupId: Types.ObjectId;
  assetIds: Types.ObjectId[]
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const rosterManagementSchema = new Schema<IRoster>(
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


const RosterManagementModel: Model<IRoster> = mongoose.model<IRoster>(
  'rosters',
  rosterManagementSchema,
  'rosters'
);

export { RosterManagementModel };
