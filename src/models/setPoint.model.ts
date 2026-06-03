import type { Document, Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface ISetPoint extends Document {
  name: string;
  description?: string;
  type: string;
  setPointDetails: unknown;
}

const setPointSchema = new Schema<ISetPoint>(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required:false
    },
    type: {
      type: String,
      required: true,
    },
    setPointDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SetPointModel: Model<ISetPoint> = mongoose.model<ISetPoint>(
  'SetPoint',
  setPointSchema,
  'setPoints'
);

export { SetPointModel, ISetPoint };
