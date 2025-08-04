import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ILogbookAssetConfiguration extends Document {
  assetId: Types.ObjectId | null;
  logbookTemplateId: Types.ObjectId | null;
  
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
      required: true,
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

const LogbookAssetConfigurationModel: Model<ILogbookAssetConfiguration> =
  mongoose.model<ILogbookAssetConfiguration>(
    "logbookConfigurations",
    LogbookConfigurationSchema,
    "logbookConfigurations"
  );

export { LogbookAssetConfigurationModel, ILogbookAssetConfiguration };
