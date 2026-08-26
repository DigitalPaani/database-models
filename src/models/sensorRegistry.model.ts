import mongoose, { Schema, Document, Types } from "mongoose";

interface IQuantity {
  value: number;
  unit: string;
}

interface IDriftQuantity extends IQuantity {
  per?: string;
}

interface IStuckTolerance {
  value: number;
  type: "FIXED" | "FSR";
}

interface IDataSheet {
  url: string;
  comments?: string;
}

const QuantitySchema = new Schema<IQuantity>(
  {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
);

const DriftQuantitySchema = new Schema<IDriftQuantity>(
  {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    per: { type: String, required: false },
  },
  { _id: false }
);

const StuckToleranceSchema = new Schema<IStuckTolerance>(
  {
    value: { type: Number, required: true },
    type: { type: String, enum: ["FIXED", "FSR"], required: true },
  },
  { _id: false }
);

const DataSheetSchema = new Schema<IDataSheet>(
  {
    url: { type: String, required: true },
    comments: { type: String, required: false },
  },
  { _id: false }
);

interface ITemplateTag {
  tag: string;
  name: string;
  validMin?: number;
  validMax?: number;
  cautionMin?: number;
  cautionMax?: number;
  safeMin?: number;
  safeMax?: number;
  showCautionZone?: boolean;
  isThresholdConfigured?: boolean;
  frequency?: IQuantity;
  precision?: IQuantity;
  resolution?: IQuantity;
  drift?: IDriftQuantity;
  detectionLimit?: IQuantity;
  t90ResponseTime?: IQuantity;
  stuckWindowTime?: IQuantity;
  stuckTolerance?: IStuckTolerance;
  stuckMinThreshold?: number;
  stuckMaxThreshold?: number;
  dataSheets?: IDataSheet[];
  units?: string[];
  technologyType?: string;
  signalType?: string;
}

const TemplateTagSchema = new Schema<ITemplateTag>({
  tag: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  validMin: { type: Number, required: false },
  validMax: { type: Number, required: false },
  cautionMin: { type: Number, required: false },
  cautionMax: { type: Number, required: false },
  safeMin: { type: Number, required: false },
  safeMax: { type: Number, required: false },
  showCautionZone: { type: Boolean, required: false },
  isThresholdConfigured: { type: Boolean, required: false, default: false },
  frequency: { type: QuantitySchema, required: false },
  precision: { type: QuantitySchema, required: false },
  resolution: { type: QuantitySchema, required: false },
  drift: { type: DriftQuantitySchema, required: false },
  detectionLimit: { type: QuantitySchema, required: false },
  t90ResponseTime: { type: QuantitySchema, required: false },
  stuckWindowTime: { type: QuantitySchema, required: false },
  stuckTolerance: { type: StuckToleranceSchema, required: false },
  stuckMinThreshold: { type: Number },
  stuckMaxThreshold: { type: Number },
  dataSheets: { type: [DataSheetSchema], required: false },
  units: { type: [String], required: false },
  technologyType: { type: String, required: false },
  signalType: { type: String, required: false },
});

interface ISensorRegistry extends Document {
  sensorName: string;
  sensorCompanyId: Types.ObjectId;
  sensorModelNumber: string;
  granularity: string[];
  purposeTags?: ITemplateTag[];
}

const SensorRegistrySchema = new Schema<ISensorRegistry>(
  {
    sensorName: { type: String, required: true, trim: true },
    sensorCompanyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "company",
    },
    sensorModelNumber: { type: String, required: true },
    granularity: { type: [String], required: true },
    purposeTags: {
      type: [TemplateTagSchema],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

const SensorRegistryModel = mongoose.model<ISensorRegistry>(
  "SensorRegistry",
  SensorRegistrySchema,
  "SensorRegistry"
);

export { SensorRegistryModel, ISensorRegistry };
