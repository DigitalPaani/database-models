import mongoose, { Document, Model } from "mongoose";
export type ModuleType = "INSIGHT" | "TASK" | "INSIGHT_TEMPLATES" | "TASK_TEMPLATES" | "ASSETS" | "INSIGHT_COMMENT";
interface ITranslation extends Document {
    moduleType: ModuleType;
    language: string;
    referenceId: mongoose.Types.ObjectId;
    translations: Map<string, string>;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TranslationsModel: Model<ITranslation>;
export { TranslationsModel, ITranslation };
//# sourceMappingURL=translations.model.d.ts.map