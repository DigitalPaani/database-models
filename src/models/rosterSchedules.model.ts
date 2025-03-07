import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';
require('./newUserModel');

interface IRosterSchedule extends Document {
  rosterId: Types.ObjectId;
  userId: Types.ObjectId;
  reoccurrenceId: string;
  fromDate: number;
  toDate: number;
  bounds: object;
  slots: object[];
  rule: string;
  color: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const rosterScheduleSchema = new Schema<IRosterSchedule>(
  {
    rosterId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    reoccurrenceId: {
      type: String,
      required: false,
    },
    fromDate: {
      type: Number,
      required: true,
    },
    toDate: {
      type: Number,
      required: true,
    },
    bounds: {
      type: Object,
      required: false
    },
    slots: {
      type: [Object],
      required: false
    },
    rule: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false
  }
);

const RosterSchedulesModel: Model<IRosterSchedule> = mongoose.model<IRosterSchedule>(
  'roster-schedules',
  rosterScheduleSchema,
  'roster-schedules'
);

export { RosterSchedulesModel, IRosterSchedule };
