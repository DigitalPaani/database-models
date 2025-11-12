import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
require("./sensorModel");
import bioHealthTrackerConstants from "../constants/bio-health-tracker.constants";


interface IFlocMark extends Document {
    mark: string,
    timestamp: Date
};




interface IErrorMark extends Document {
    errorCode: string,
    timestamp: Date
};


interface IFlocSample extends Document {
    sensorId: Types.ObjectId;
    sampleId: string;
    startTime: Date;
    endTime: Date;
    isDefault: boolean;
    hide: boolean;
    marks: IFlocMark[]
    errorMarks: IErrorMark[]
    isArchived: boolean;
};

const flocMarkSchema = new Schema<IFlocMark>({
    mark: {
      type: String,
      enum: bioHealthTrackerConstants.FLOC_STATES
    },
    timestamp: {
      type: Date
    }
});

const errorMarkSchema = new Schema<IErrorMark>({
    errorCode: {
      type: String,
      enum: bioHealthTrackerConstants.ERROR_CODES
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
    errorMarks: {
      type: [errorMarkSchema],
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
  IFlocSample,
  IErrorMark
};