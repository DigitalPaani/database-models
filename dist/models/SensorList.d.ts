import mongoose, { Document, Types } from "mongoose";
interface ISensor extends Document {
    sensorCompanyId: Types.ObjectId;
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