import mongoose, { Schema, Document, Types } from "mongoose";

interface IDataLogger extends Document {
  name: string;
  description: string;
  assetId: Types.ObjectId;
  createdBy: Types.ObjectId;
  serialNumber?: string;
  code?: number
  parentId?: Types.ObjectId;
  version: number;

  // json fields for aws job
  plcBrand?: string;
  plcId?: string;
  modbusHost?: string;
  modbusPort?: number;
  unitIdReal?: number;
  startAddressReal?: number;
  registerCountReal?: number;
  unitIdBool?: number;
  startAddressBool?: number;
  registerCountBool?: number;
  pollingInterval?: number;

  // common fields for all schemas
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const dataLoggerSchema = new Schema<IDataLogger>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    serialNumber: {
      type: String,
    },
    code: {
      type: String,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "dataLoggers",
    },
    version: {
      type: Number,
      default: 0,
    },

    // JSON fields in camelCase
    plcBrand: {
      type: String,
    },
    plcId: {
      type: String,
    },
    modbusHost: {
      type: String,
    },
    modbusPort: {
      type: Number,
    },
    unitIdReal: {
      type: Number,
    },
    startAddressReal: {
      type: Number,
    },
    registerCountReal: {
      type: Number,
    },
    unitIdBool: {
      type: Number,
    },
    startAddressBool: {
      type: Number,
    },
    registerCountBool: {
      type: Number,
    },
    pollingInterval: {
      type: Number,
    },

    // common field for all schema
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// Partial Unique Index
dataLoggerSchema.index(
  { serialNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
      serialNumber: { $exists: true },
    },
  }
);

const DataLoggerModel = mongoose.model<IDataLogger>(
  "dataLoggers",
  dataLoggerSchema,
  "dataLoggers"
);

export { DataLoggerModel, IDataLogger };
