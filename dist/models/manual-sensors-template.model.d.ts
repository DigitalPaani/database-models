import mongoose, { Document } from "mongoose";
export interface IManualTemplateTag {
    tag: string;
    threshold: {
        validMin: number;
        validMax: number;
        cautionMin?: number;
        cautionMax?: number;
        safeMin: number;
        safeMax: number;
        showCautionZone?: boolean;
    };
    isThresholdConfigured?: boolean;
}
interface IManualSensors extends Document {
    sensorName: string;
    tag: string;
    category: string;
    isArchived: boolean;
    type: string;
    templateTag: IManualTemplateTag;
}
declare const ManualSensorModel: mongoose.Model<IManualSensors, {}, {}, {}, mongoose.Document<unknown, {}, IManualSensors> & IManualSensors & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export { ManualSensorModel, IManualSensors };
//# sourceMappingURL=manual-sensors-template.model.d.ts.map