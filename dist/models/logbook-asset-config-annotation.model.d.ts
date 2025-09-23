import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ILogbookAssetConfigAnnotation extends Document {
    logbookAssetConfigurationId: Types.ObjectId | null;
    assetId: Types.ObjectId | null;
    inputImageAttachmentId: Types.ObjectId | null;
    awsTextractRawDoc: any;
    isArchived: boolean;
}
declare const LogbookAssetConfigAnnotationModel: Model<ILogbookAssetConfigAnnotation>;
export { LogbookAssetConfigAnnotationModel, ILogbookAssetConfigAnnotation };
//# sourceMappingURL=logbook-asset-config-annotation.model.d.ts.map