import { Model, Types } from "mongoose";
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
declare const TranslationModel: Model<ITranslation>;
export { TranslationModel, ITranslation };
//# sourceMappingURL=translations.model.d.ts.map