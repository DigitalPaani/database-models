/* eslint-disable no-unused-vars */
import type { Types } from 'mongoose';

export namespace FormulaCommonTypes {

  export type SensorSetting = {
    uuid?: string;
    sensorId: string;
    sensorTag: string;
    granularity: string;
    aggregation: string;
    firstReferenceTimeInMinutes: number;
    lastReferenceTimeInMinutes: number;
  };
  
  export type Frequency = {
    dateTime?: number;
    sensorId?: string;
    timeInMinutes: number;
  };
  
  export type CreateOrUpdateFormulaDTO = {
    name: string;
    description: string;
    unit: string;
    userGroupId: Types.ObjectId;
    workspaceId: Types.ObjectId;
    plantId?: Types.ObjectId;
    formulaTag: string;
    formulaChips: string[];
    applyToHistoricalData?: boolean;
    frequency: Frequency;
    type: string;
    sensorSettings: Record<string, SensorSetting>;
  }
}
