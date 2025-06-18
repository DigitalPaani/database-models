import mongoose, { Schema, Document } from "mongoose";

interface IDataLoggerSession extends Document {
  code: number;
  serialNumber: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const dataLoggerSessionSchema = new Schema<IDataLoggerSession>(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
    },
    serialNumber: {
      type: String,
      unique: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const DataLoggerSessionModel = mongoose.model<IDataLoggerSession>(
  "dataLoggerSessions",
  dataLoggerSessionSchema,
  "dataLoggerSessions"
);

export { DataLoggerSessionModel, IDataLoggerSession };
