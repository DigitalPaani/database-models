import mongoose, { Document } from "mongoose";
interface ISensor extends Document {
    sensorCompany: string;
    sensorModelNumber: string;
    granularity: string[];
    purpose: string[];
    inputType: ("Modbus" | "Analog" | "Digital")[];
    tags: string[];
}
declare const SensorModel: mongoose.Model<ISensor, {}, {}, {}, mongoose.Document<unknown, {}, ISensor> & ISensor & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { SensorModel, ISensor };
//# sourceMappingURL=SensorList.d.ts.map