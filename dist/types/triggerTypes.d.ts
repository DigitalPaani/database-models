import { COMPONENT_NAMES, CONDITION_THRESHOLD_TYPES, CONDITIONAL_OPERATORS, RECURRENCE_FREQUENCY_TYPES } from "../constants/triggerConst";
export declare namespace TriggerTypes {
    type TriggerCondition = {
        operator: (typeof CONDITIONAL_OPERATORS)[keyof typeof CONDITIONAL_OPERATORS];
        sensorTag: string;
        threshold: number;
        thresholdType: (typeof CONDITION_THRESHOLD_TYPES)[keyof typeof CONDITION_THRESHOLD_TYPES];
    };
    type Recurrence = {
        frequency?: (typeof RECURRENCE_FREQUENCY_TYPES)[keyof typeof RECURRENCE_FREQUENCY_TYPES];
        interval?: number;
        daysOfWeek?: number[];
        dayOfMonth?: number[];
        weekOfMonth?: number[];
        month?: number[];
    };
    type TriggerConditionDetails = {
        operator: (typeof CONDITIONAL_OPERATORS)[keyof typeof CONDITIONAL_OPERATORS];
        sensorTag: string;
        threshold: number;
        thresholdType: (typeof CONDITION_THRESHOLD_TYPES)[keyof typeof CONDITION_THRESHOLD_TYPES];
    };
    type Conditions = {
        resolutionFreq?: number;
        observationFreq?: number;
        resolutionConditions?: TriggerConditionDetails[][];
        observationConditions?: TriggerConditionDetails[][];
    };
    type TriggerData = {
        componentName?: (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];
        componentData?: Record<string, any>;
    };
}
//# sourceMappingURL=triggerTypes.d.ts.map