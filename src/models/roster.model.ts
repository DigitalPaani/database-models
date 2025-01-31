import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IRoster extends Document {
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assetIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
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

export { RosterManagementModel, IRoster };
