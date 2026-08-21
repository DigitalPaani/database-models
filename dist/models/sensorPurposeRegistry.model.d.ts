import type { Document, Model } from "mongoose";
interface ISensorPurposeRegistry extends Document {
    tag: string;
    name: string;
    category: string;
    description?: string;
    allowedUnits?: string[];
    waterQualityFlag?: boolean;
    dataType?: "float" | "boolean" | "string" | "integer";
}
declare const SensorPurposeRegistryModel: Model<ISensorPurposeRegistry>;
export { SensorPurposeRegistryModel, ISensorPurposeRegistry };
//# sourceMappingURL=sensorPurposeRegistry.model.d.ts.map