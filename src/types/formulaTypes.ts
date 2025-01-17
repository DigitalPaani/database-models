/* eslint-disable no-unused-vars */
import type { Types } from "mongoose";

export namespace FormulaCommonTypes {
  export type SensorSetting = {
    _id: Types.ObjectId;
    sensorId: Types.ObjectId;
    sensorTag: string;
    granularity: "Minutes" | "Hours" | "Days" | "Weeks" | "Months";
    aggregation: "Average" | "Current" | "Minimum" | "Maximum" | "Cumulative";
    firstReferenceTimeInMinutes: number;
    lastReferenceTimeInMinutes: number;
  };

  export type FormulaChip = {
    value: string;
    type: "hyperFormulaFunction" | "operator" | "sensorSetting";
    color: string;
    sensorSetting?: SensorSetting;
  };

  export type Frequency = {
    dateTime?: number;
    sensorId?: Types.ObjectId;
    timeInMinutes: number;
  };
}
