import type { Document, Model } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface ISetPoint extends Document {
  name: string;
  type: string;
  setPoint: unknown;
}

const setPointSchema = new Schema<ISetPoint>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    setPoint: {
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
