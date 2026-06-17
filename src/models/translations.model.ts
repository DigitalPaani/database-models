import mongoose, { Schema, Document, Model } from "mongoose";
import { MODULE_TYPES, ModuleType } from "../constants/translation-config.constants";


interface ITranslation extends Document {
  moduleType: ModuleType;
  language: string; // e.g. "hn"
  referenceId: mongoose.Types.ObjectId; // _id of the original document
  translations: Map<string, string>;
  translationVersion: number;
  fieldHashes?: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
}


const translationsSchema = new Schema<ITranslation>(
  {
    moduleType: {
      type: String,
      required: true,
      enum: MODULE_TYPES,
    },
    language: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    translations: {
      type: Map,
      of: String,
      required: true,
      default: {},
    },
    translationVersion: {
      type: Number,
      required: true,
      default: 1,
    },
    fieldHashes: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

translationsSchema.index(
  { moduleType: 1, language: 1, referenceId: 1 },
  { unique: true }
);

// TTL index: auto-delete documents older than 4 months (120 days)
translationsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10368000 });


const TranslationsModel: Model<ITranslation> =
  mongoose.models.Translations ||
  mongoose.model<ITranslation>("Translations", translationsSchema);

export {
    TranslationsModel,
    ITranslation
};