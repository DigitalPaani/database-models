import type { Types } from 'mongoose';
export declare namespace FormulaCommonTypes {
    type SensorSetting = {
        uuid?: string;
        sensorId: string;
        sensorTag: string;
        granularity: string;
        aggregation: string;
        firstReferenceTimeInMinutes: number;
        lastReferenceTimeInMinutes: number;
    };
    type Frequency = {
        dateTime?: number;
        sensorId?: string;
        timeInMinutes: number;
    };
    type CreateOrUpdateFormulaDTO = {
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
    };
}
//# sourceMappingURL=formulaTypes.d.ts.map