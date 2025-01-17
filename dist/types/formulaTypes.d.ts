import type { Types } from "mongoose";
export declare namespace FormulaCommonTypes {
    type SensorSetting = {
        _id: Types.ObjectId;
        sensorId: Types.ObjectId;
        sensorTag: string;
        granularity: "Minutes" | "Hours" | "Days" | "Weeks" | "Months";
        aggregation: "Average" | "Current" | "Minimum" | "Maximum" | "Cumulative";
        firstReferenceTimeInMinutes: number;
        lastReferenceTimeInMinutes: number;
    };
    type FormulaChip = {
        value: string;
        type: "hyperFormulaFunction" | "operator" | "sensorSetting";
        color: string;
        sensorSetting?: SensorSetting;
    };
    type Frequency = {
        dateTime?: number;
        sensorId?: Types.ObjectId;
        timeInMinutes: number;
    };
}
//# sourceMappingURL=formulaTypes.d.ts.map