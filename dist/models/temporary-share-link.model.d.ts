import type { Document, Model } from 'mongoose';
import { Types } from 'mongoose';
interface ITemporaryShareLinksModel extends Document {
    url: string;
    shortToken: string;
    type: string;
    insightId: Types.ObjectId;
    expiresAt: Date;
    isArchived: boolean;
}
declare const TemporaryShareLinksModel: Model<ITemporaryShareLinksModel>;
export { TemporaryShareLinksModel, ITemporaryShareLinksModel };
//# sourceMappingURL=temporary-share-link.model.d.ts.map