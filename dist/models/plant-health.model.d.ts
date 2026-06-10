import type { Document, Types } from "mongoose";
import mongoose from "mongoose";
export interface IPlantHealth extends Document {
    plantId: Types.ObjectId;
    lastContactedTime: number;
    internet: boolean;
}
export declare const PlantHealthModel: mongoose.Model<IPlantHealth, {}, {}, {}, Document<unknown, {}, IPlantHealth> & IPlantHealth & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=plant-health.model.d.ts.map