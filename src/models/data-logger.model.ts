import mongoose, { Schema, Document, Types } from "mongoose";

interface IDataLogger extends Document {
  name: string;
  createdBy: Types.ObjectId;
  serialNumber: string;
  version: number;

  // json fields for aws job
  debug: boolean;
  plcBrand: string;
  plcModel: string;
  assetId: Types.ObjectId;
  modbusHost: string;
  modbusPort: number;
  unitIdReal: number;
  startAddressReal: number;
  registerCountReal: number;
  unitIdBool: number;
  startAddressBool: number;
  registerCountBool: number;
  pollingInterval: number;

  // common fields for all schemas
  isDeleted: boolean;
  deletedBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const dataLoggerSchema = new Schema<IDataLogger>(
  {
    name: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
    },
    version: {
      type: Number,
      default: 0,
    },

    // JSON fields in camelCase
    debug: {
      type: Boolean,
      default: false,
      required: true,
    },
    plcBrand: {
      type: String,
      enum: ["Fuji", "Delta"],
      required: true,
    },
    pollingInterval: {
      type: Number,
      required: true,
    },
    plcModel: {
      type: String,
      required: true,
      trim: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    modbusHost: {
      type: String,
      required: true,
    },
    modbusPort: {
      type: Number,
      required: true,
    },
    unitIdReal: {
      type: Number,
      required: true,
    },
    startAddressReal: {
      type: Number,
      required: true,
    },
    registerCountReal: {
      type: Number,
      required: true,
    },
    unitIdBool: {
      type: Number,
      required: true,
    },
    startAddressBool: {
      type: Number,
      required: true,
    },
    registerCountBool: {
      type: Number,
      required: true,
    },

    // common field for all schema
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "NewUser",
      default: null,
      validate: {
        validator: function (this: IDataLogger, value: Types.ObjectId): boolean {
          if (this.isDeleted) {
            return value != null;
          }
          return value == null;
        },
      message: "deletedBy must be set when isDeleted is true",
    }
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
