import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface ILogbookAssetConfiguration extends Document {
    assetId: Types.ObjectId | null;
    logbookTemplateId: Types.ObjectId | null;
    isArchived: boolean;
}
declare const LogbookAssetConfigurationModel: Model<ILogbookAssetConfiguration>;
export { LogbookAssetConfigurationModel, ILogbookAssetConfiguration };
//# sourceMappingURL=logbook-configuration.model.d.ts.map