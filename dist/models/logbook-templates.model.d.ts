import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ILogbookTemplate extends Document {
    name: string;
    description: string;
    type: string;
    category: string;
    imageAttachmentId: Types.ObjectId | null;
    annotationIds: [Types.ObjectId];
    isArchived: boolean;
}
declare const LogbookTemplateModel: Model<ILogbookTemplate>;
export { LogbookTemplateModel, ILogbookTemplate };
//# sourceMappingURL=logbook-templates.model.d.ts.map