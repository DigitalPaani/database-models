import type { Document, Model } from 'mongoose';
import mongoose, { Schema, Types } from 'mongoose';

interface IRosterEvent extends Document {
  rosterId: Types.ObjectId;
  eventId: string;
  title: string;
  fromDate: number;
  toDate: number;
  type: string;
  custom: string;
  color: string;
  isArchived: boolean;
  createdBy: Types.ObjectId;
}

const rosterEventsSchema = new Schema<IRosterEvent>(
  {
    rosterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    title: {
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
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'],
      required: false,
    },
    custom: {
      type: String,
      enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      required: false,
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

const RosterEventsModel: Model<IRosterEvent> = mongoose.model<IRosterEvent>(
  'roster-events',
  rosterEventsSchema,
  'roster-events'
);

export { RosterEventsModel, IRosterEvent };
