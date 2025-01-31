import type { Document, Model } from "mongoose";
interface IAttachment extends Document {
    attachmentLink: string;
    filename: string;
    neverExpire: boolean;
}
declare const AttachmentModel: Model<IAttachment>;
export { AttachmentModel, IAttachment };
//# sourceMappingURL=attachments.model.d.ts.map