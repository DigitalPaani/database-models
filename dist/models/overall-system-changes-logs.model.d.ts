import type { Document, Model } from "mongoose";
interface IOverallSystemChangesLog extends Document {
    feature: string;
    type: string;
    oldConfiguration: any;
    newConfiguration: any;
}
declare const OverallSystemChangesLogModel: Model<IOverallSystemChangesLog>;
export { OverallSystemChangesLogModel, IOverallSystemChangesLog };
//# sourceMappingURL=overall-system-changes-logs.model.d.ts.map