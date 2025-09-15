import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface IOcrLogbookDataInputLog extends Document {
  logbookAssetConfigurationId: Types.ObjectId;
  assetId: Types.ObjectId;
  logbookTemplateId: Types.ObjectId;
  attachmentId: Types.ObjectId;
  dataInputSelectedValues: IDataInputSelectedValue[];
  isArchived: boolean;
}

interface IDataInputSelectedValue extends Document {
  key: string;
  value: string;
}

const DataInputSelectedValueSchema = new Schema<IDataInputSelectedValue>({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const LogbookConfigurationSchema = new Schema<IOcrLogbookDataInputLog>(
  {
    logbookAssetConfigurationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    logbookTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dataInputSelectedValues: {
      type: [DataInputSelectedValueSchema],
      required: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const OcrLogbookDataInputLogModel: Model<IOcrLogbookDataInputLog> =
  mongoose.model<IOcrLogbookDataInputLog>(
    "ocrLogbookDataInputLogs",
    LogbookConfigurationSchema,
    "ocrLogbookDataInputLogs"
  );

export { OcrLogbookDataInputLogModel, IOcrLogbookDataInputLog };
