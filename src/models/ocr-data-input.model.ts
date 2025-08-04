import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ILogbookConfiguration extends Document {
  attachmentId: Types.ObjectId | null;
  logbookTemplateId: Types.ObjectId | null;
  isArchived: boolean;
};




const LogbookConfigurationSchema = new Schema<ILogbookConfiguration>(
  {
    attachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const LogbookConfigurationModel: Model<ILogbookConfiguration> =
  mongoose.model<ILogbookConfiguration>(
    "logbookConfigurations",
    LogbookConfigurationSchema,
    "logbookConfigurations"
  );

export { LogbookConfigurationModel, ILogbookConfiguration };
