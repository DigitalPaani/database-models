import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ILogbookAssetConfiguration extends Document {
  assetId: Types.ObjectId | null;
  logbookTemplateId: Types.ObjectId | null;
  textractConfiguration: Schema.Types.Mixed;
  logbookSchema: Schema.Types.Mixed;
  sectionInfo: string;
  annotationIds: Types.ObjectId[];
  isArchived: boolean;
};




const LogbookConfigurationSchema = new Schema<ILogbookAssetConfiguration>(
  {
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    logbookTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "logbookTemplates",
      required: true,
    },
    textractConfiguration: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },
    logbookSchema: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },
    sectionInfo: {
      type: String,
      required: false
    },
    annotationIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Compound unique index with partial filter
LogbookConfigurationSchema.index(
  { assetId: 1, logbookTemplateId: 1 },
  { 
    unique: true,
    partialFilterExpression: { isArchived: false } 
  }
);

const LogbookAssetConfigurationModel: Model<ILogbookAssetConfiguration> =
  mongoose.model<ILogbookAssetConfiguration>(
    "logbookConfigurations",
    LogbookConfigurationSchema,
    "logbookConfigurations"
  );

export { LogbookAssetConfigurationModel, ILogbookAssetConfiguration };