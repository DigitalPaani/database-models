import mongoose, { Schema, Document } from "mongoose";
import commonConstants from "../constants/commonConstants";
interface IDataInputLogs extends Document {
  status: string;
  record: any;
  errorMessage?: string
}

const dataInputLogsSchema = new Schema<IDataInputLogs>(
  {
    status: {
      type: String,
      enum: commonConstants.DATA_INPUT_LOGS_STATUS_ENUMS,
      required: true,
    },
    record: {
      type: Schema.Types.Mixed,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true },
);

const DataInputLogsModel = mongoose.model<IDataInputLogs>(
  "dataInputLogs",
  dataInputLogsSchema,
  "dataInputLogs",
);

export { DataInputLogsModel, IDataInputLogs };
