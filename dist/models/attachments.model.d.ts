import type { Document, Model } from "mongoose";
interface IAttachment extends Document {
    attachmentLink: string;
    filename: string;
    expireAt: Date | null;
}
declare const AttachmentModel: Model<IAttachment>;
export { AttachmentModel, IAttachment };
//# sourceMappingURL=attachments.model.d.ts.map