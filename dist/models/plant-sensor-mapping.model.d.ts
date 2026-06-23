import { Types, type Document, type Model } from "mongoose";
interface IPlantSensorMapping extends Document {
    plantId: Types.ObjectId;
    mappings: Record<string, string[]>;
}
declare const PlantSensorMappingModel: Model<IPlantSensorMapping>;
export { PlantSensorMappingModel, IPlantSensorMapping };
//# sourceMappingURL=plant-sensor-mapping.model.d.ts.map