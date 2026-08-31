import type { Document, Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
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
    allSensorValues: any[];
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

// primary lookup: sampleId is filtered on by every mark/end operation.
// partial filter because sampleId is not required, so a plain unique index
// would collide across documents that have no sampleId.
flocSampleSchema.index(
  { sampleId: 1 },
  {
    unique: true,
    partialFilterExpression: { sampleId: { $type: "string" } }
  }
);

// serves "latest sample for a sensor" lookups (sensorId equality, createdAt sort)
flocSampleSchema.index({ sensorId: 1, createdAt: -1 });

const FlocSampleModel: Model<IFlocSample> = mongoose.model<IFlocSample>('flocsamples', flocSampleSchema, 'flocsamples');
export {
  FlocSampleModel,
  IFlocSample,
  IErrorMark
};