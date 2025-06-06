import mongoose, { Schema, Document, Types } from "mongoose";

interface IDataLogger extends Document {
  name: string;
  description: string;
  assetId: Types.ObjectId;
  createdBy: Types.ObjectId;
  serialNumber?: String;
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
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const DataLoggerModel = mongoose.model<IDataLogger>(
  "dataLoggers",
  dataLoggerSchema,
  "dataLoggers"
);

export { DataLoggerModel, IDataLogger };
