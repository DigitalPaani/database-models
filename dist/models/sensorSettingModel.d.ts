import type { Document, Model, Types } from "mongoose";
interface ISensorSetting extends Document {
    sensorId: Types.ObjectId;
    sensorTag: string;
    granularity: "Minutes" | "Hours" | "Days" | "Weeks" | "Months";
    aggregation: "Average" | "Current" | "Minimum" | "Maximum" | "Cumulative";
    firstReferenceTimeInMinutes: number;
    lastReferenceTimeInMinutes: number;
    returnType: "values" | "value" | "datetime";
}
declare const SensorSettingsModel: Model<ISensorSetting>;
export { SensorSettingsModel, ISensorSetting };
//# sourceMappingURL=sensorSettingModel.d.ts.map