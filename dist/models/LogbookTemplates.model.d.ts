import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ILogbookTemplate extends Document {
    name: string;
    description: string;
    type: string;
    category: string;
    imageAttachmentId: Types.ObjectId | null;
    isArchived: boolean;
}
declare const LogbookTemplateModel: Model<ILogbookTemplate>;
export { LogbookTemplateModel, ILogbookTemplate };
//# sourceMappingURL=LogbookTemplates.model.d.ts.map