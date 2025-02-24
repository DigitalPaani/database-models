import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ITwilioCall extends Document {
  from: string;
  to: string;
  message: string;
  retryingCount: number;
  callSid: string;
  callAnswered: boolean;
  serviceType: string;
  code: string;
}

const twilioCallSchema = new Schema(
  {
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    retryingCount: {
      type: Number,
      required: false,
    },
    callSid: {
      type: String,
      required: false,
    },
    callAnswered: {
      type: Boolean,
      required: false,
    },
    serviceType: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TwilioCallModel: Model<ITwilioCall> = mongoose.model<ITwilioCall>(
  "twilioCalls",
  twilioCallSchema,
  "twilioCalls"
);

export { TwilioCallModel, ITwilioCall };


