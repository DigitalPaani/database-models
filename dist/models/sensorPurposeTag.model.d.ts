import type { Document, Model } from "mongoose";
interface ISensorPurposeTag extends Document {
    key: string;
    abbr: string;
    name: string;
    category: string;
    stuckWindowTime?: number;
    stuckValueTolerance?: number;
    fixedStuckTolerance?: number;
}
declare const SensorPurposeTagModel: Model<ISensorPurposeTag>;
export { SensorPurposeTagModel, ISensorPurposeTag };
//# sourceMappingURL=sensorPurposeTag.model.d.ts.map