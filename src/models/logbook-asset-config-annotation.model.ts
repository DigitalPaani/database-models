import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";

interface ILogbookAssetConfigAnnotation extends Document {
  logbookAssetConfigurationId: Types.ObjectId | null;
  assetId: Types.ObjectId | null
  inputImageAttachmentId: Types.ObjectId | null;
  awsTextractRawDoc: any;
  isArchived: boolean;
};



// LogbookAssetConfigAnnotationSchema
const LogbookAssetConfigAnnotationSchema = new Schema<ILogbookAssetConfigAnnotation>(
  {
    logbookAssetConfigurationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,  
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    inputImageAttachmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    awsTextractRawDoc: {
        type: mongoose.Schema.Types.Mixed,
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

const LogbookAssetConfigAnnotationModel: Model<ILogbookAssetConfigAnnotation> =
  mongoose.model<ILogbookAssetConfigAnnotation>(
    "logbookAssetConfigAnnotation",
    LogbookAssetConfigAnnotationSchema,
    "logbookAssetConfigAnnotation"
  );

export { LogbookAssetConfigAnnotationModel, ILogbookAssetConfigAnnotation };