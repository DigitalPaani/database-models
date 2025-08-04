import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ILogbookConfiguration extends Document {
    attachmentId: Types.ObjectId | null;
    logbookTemplateId: Types.ObjectId | null;
    isArchived: boolean;
}
declare const LogbookConfigurationModel: Model<ILogbookConfiguration>;
export { LogbookConfigurationModel, ILogbookConfiguration };
//# sourceMappingURL=ocr-data-input.model.d.ts.map