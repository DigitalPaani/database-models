import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IRoster extends Document {
  name: string;
  description: string;
  userGroupId: Schema.Types.ObjectId;
  assetIds: Schema.Types.ObjectId[];
  isArchived: boolean;
  managementUserId: Schema.Types.ObjectId | null;
  createdBy: Schema.Types.ObjectId;
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
        type: Schema.Types.ObjectId,
        ref: "UserGroup",
        required: true,
    },
    assetIds: {
        type: [Schema.Types.ObjectId],
        ref: "Plant",
        required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: false,
    },
    managementUserId: {
      type: Schema.Types.ObjectId,
      ref: 'NewUser',
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
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
