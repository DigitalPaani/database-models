import mongoose, { Schema, Document, Types } from "mongoose";

interface IDataLogger extends Document {
  name: string;
  description: string;
  assetId: Types.ObjectId;
  createdBy: Types.ObjectId;
  serialNumber?: string;
  parentId?: Types.ObjectId;
  version: number
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
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "dataLoggers",
    },
    version: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true, strict: false }
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
