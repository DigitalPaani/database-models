import mongoose, { Types } from "mongoose";
import { SENSOR_PURPOSE_TAGS } from "../constants/sensorConst";
const Schema = mongoose.Schema;

interface FlocChildSensors {
  FDSTParent: Types.ObjectId;
  SVOL30: Types.ObjectId;
  SVOL30Image: Types.ObjectId;
  SVOL60: Types.ObjectId;
  SVOL60Image: Types.ObjectId;
  SVOL90: Types.ObjectId;
  SVOL90Image: Types.ObjectId;
  SVOLRaw: Types.ObjectId;
  SVOLCustom: Types.ObjectId;
  SVOLCustomImage: Types.ObjectId;
  SVOLIssue: Types.ObjectId;
  SVOLIssueImage: Types.ObjectId;
}

export interface ISensor {
  _id?: Types.ObjectId;
  sensorName?: string;
  sensorTag: string;
  sensorNickName: string;
  plantId?: Types.ObjectId;
  storeId?: Types.ObjectId;
  dataType: string;
  sensorType: string;
  dataInputType: string;
  plcId?: Types.ObjectId;
  isEnabled: boolean;
  sensorTypeAbr?: string;
  oldSensorTag?: string;
  sensorOffSet?: Types.ObjectId;
  parentSensor?: Types.ObjectId | null;
  flocChildSensors?: FlocChildSensors;
  granularity?: number;
  confidenceScore?: number;
  category?: string;
}

const flocChildSensorsSchema = new Schema({
  FDSTParent: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL30: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL30Image: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL60: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL60Image: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL90: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOL90Image: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOLRaw: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOLCustom: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOLCustomImage: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOLIssue: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  SVOLIssueImage: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }
});

const sensor = new Schema(
  {
    sensorName: String,
    sensorTag: String,
    sensorNickName: String,
    plantId: mongoose.Schema.Types.ObjectId,
    workspaceId: mongoose.Schema.Types.ObjectId,
    dataType: String,
    sensorType: String,
    dataInputType: String,
    granularity: { type: Number, default: 60 },
    plcId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    isEnabled: Boolean,
    sensorTypeAbr: {
      type: String,
      required: false,
    },
    storeId: {
      type: Types.ObjectId,
      required: false,
    },
    oldSensorTag: String,
    sensorOffSet: {
      type: Types.ObjectId,
      ref: "sensorOffSet",
    },
    parentSensor: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    flocChildSensors: {
      type: flocChildSensorsSchema,
      required: false,
    },
    confidenceScore: { type: Number, min: 1, max: 100, default: 90 },
    dynamic: { type: Boolean, default: false },
    category: {
      type: String,
      required: false,
      enum: [...SENSOR_PURPOSE_TAGS.map((tag) => tag.name), 'Other'],
      default: 'Other',
    },
  },
  {
    timestamps: true,
  }
);

const SensorsModel = mongoose.model<ISensor & mongoose.Document>(
  "sensors",
  sensor
);
type ISensorsData = ISensor;

export { SensorsModel, ISensorsData };
