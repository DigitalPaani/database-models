import type { Document, Model } from "mongoose";
interface ISensorCategory extends Document {
    key: string;
    abbr: string;
    name: string;
    isDeprecated: boolean;
}
declare const SensorCategoryModel: Model<ISensorCategory>;
export { SensorCategoryModel, ISensorCategory };
//# sourceMappingURL=sensorCategories.model.d.ts.map