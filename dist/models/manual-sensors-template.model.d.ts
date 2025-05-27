import mongoose, { Document } from "mongoose";
interface IManualSensors extends Document {
    sensorName: string;
    tags: string;
    category: string;
    isArchived: boolean;
    type: string;
}
declare const ManualSensorModel: mongoose.Model<IManualSensors, {}, {}, {}, mongoose.Document<unknown, {}, IManualSensors> & IManualSensors & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { ManualSensorModel, IManualSensors };
//# sourceMappingURL=manual-sensors-template.model.d.ts.map