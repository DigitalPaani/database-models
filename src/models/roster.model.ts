import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IRoster extends Document {
  name: string;
  description: string;
  userGroupId: mongoose.Schema.Types.ObjectId;
  assetIds: mongoose.Schema.Types.ObjectId[];
  isArchived: boolean;
  managementUserId: mongoose.Schema.Types.ObjectId | null;
  createdBy: mongoose.Schema.Types.ObjectId;
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
        ref: "UserGroup",
        required: true,
    },
    assetIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Plant",
        required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    managementUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NewUser',
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
