import mongoose, { Document, Model } from "mongoose";
import { ModuleType } from "../constants/translation-config.constants";
interface ITranslation extends Document {
    moduleType: ModuleType;
    language: string;
    referenceId: mongoose.Types.ObjectId;
    translations: Map<string, string>;
    translationVersion: number;
    fieldHashes?: Record<string, string>;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TranslationsModel: Model<ITranslation>;
export { TranslationsModel, ITranslation };
//# sourceMappingURL=translations.model.d.ts.map