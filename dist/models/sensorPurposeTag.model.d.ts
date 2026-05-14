import type { Document, Model } from "mongoose";
interface ISensorPurposeTag extends Document {
    key: string;
    abbr: string;
    name: string;
    category: string;
    isDeprecated: boolean;
}
declare const SensorPurposeTagModel: Model<ISensorPurposeTag>;
export { SensorPurposeTagModel, ISensorPurposeTag };
//# sourceMappingURL=sensorPurposeTag.model.d.ts.map