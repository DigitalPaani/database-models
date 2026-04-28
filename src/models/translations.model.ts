import mongoose, { Model, Schema, Types } from "mongoose";
import type { Document } from "mongoose";
import { TranslationExternalType } from "../types/translationsTypes";

interface ITranslation extends Document {
  language: string;
  hashedText: string;
  translatedText: string;
  externalId: Types.ObjectId;
  externalType: TranslationExternalType;
  createdAt?: Date;
  updatedAt?: Date;
}

const translationsSchema = new Schema<ITranslation>(
  {
    language: {
      type: String,
      required: true,
    },
    hashedText: {
      type: String,
      required: true,
    },
    translatedText: {
      type: String,
      required: true,
    },
    externalId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    externalType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Primary lookup: find translation by content hash + language (also enforces deduplication)
translationsSchema.index({ hashedText: 1, language: 1 }, { unique: true });

// Reverse lookup: find all translations created for a specific document
translationsSchema.index({ externalId: 1, externalType: 1 });

const TranslationModel: Model<ITranslation> = mongoose.model<ITranslation>(
  "translations",
  translationsSchema,
  "translations"
);

export { TranslationModel, ITranslation };
