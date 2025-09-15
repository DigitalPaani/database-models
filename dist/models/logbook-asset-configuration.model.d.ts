import type { Document, Model } from "mongoose";
import { Schema, Types } from "mongoose";
interface ILogbookAssetConfiguration extends Document {
    assetId: Types.ObjectId | null;
    logbookTemplateId: Types.ObjectId | null;
    textractConfiguration: Schema.Types.Mixed;
    logbookSchema: Schema.Types.Mixed;
    sectionInfo: string;
    annotationIds: [Types.ObjectId];
    isArchived: boolean;
}
declare const LogbookAssetConfigurationModel: Model<ILogbookAssetConfiguration>;
export { LogbookAssetConfigurationModel, ILogbookAssetConfiguration };
//# sourceMappingURL=logbook-asset-configuration.model.d.ts.map