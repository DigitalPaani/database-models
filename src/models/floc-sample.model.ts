import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
require("./sensorModel");

interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime: Date;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[]
    isArchived: boolean;
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
      required: true,
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
    isArchived: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    minimize: false
  }
);

const FlocSampleModel: Model<IFlocSample> = mongoose.model<IFlocSample>('flocsamples', flocSampleSchema, 'flocsamples');
export {
  FlocSampleModel,
  IFlocSample
};