import mongoose, { Schema, Document, Model } from "mongoose";


export type ModuleType =
    | "INSIGHT"
    | "TASK"
    | "INSIGHT_TEMPLATES"
    | "TASK_TEMPLATES"
    | "ASSETS"
    | "INSIGHT_COMMENT"


interface ITranslation extends Document {
  moduleType: ModuleType;
  language: string; // e.g. "hn"
  referenceId: mongoose.Types.ObjectId; // _id of the original document
  translations: Map<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
}


const translationsSchema = new Schema<ITranslation>(
  {
    moduleType: {
      type: String,
      required: true,
      enum: [
        "INSIGHT",
        "TASK",
        "INSIGHT_TEMPLATES",
        "TASK_TEMPLATES",
        "ASSETS",
        "INSIGHT_COMMENT"
      ],
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
  },
  {
    timestamps: true,
  }
);

translationsSchema.index(
  { moduleType: 1, language: 1, referenceId: 1 },
  { unique: true }
);


const TranslationsModel: Model<ITranslation> =
  mongoose.models.Translations ||
  mongoose.model<ITranslation>("Translations", translationsSchema);

export {
    TranslationsModel,
    ITranslation
};