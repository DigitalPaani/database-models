import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
require("./sensorModel");

interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime?: Date | null;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[]
};

interface IFlocMark extends Document {
    mark: string,
    timestamp: Date
};

const flocMarkSchema = new Schema<IFlocMark>({
    mark: {
      type: String,
      enum: ['30Mark', '60Mark', '90Mark', 'noSludge', 'floatingSludge']
    },
    timestamp: {
      type: Date
    }
});


const flocSampleSchema = new Schema<IFlocSample>(
  {
    sensorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "sensors"
    },
    sampleId: {
      type: String,
      required: false
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    marks: {
      type: [flocMarkSchema],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
    minimize: false
  }
);

const FlocSampleModel: Model<IFlocSample> = mongoose.model<IFlocSample>('FlocSamples', flocSampleSchema);
export {
  FlocSampleModel,
  IFlocSample
};