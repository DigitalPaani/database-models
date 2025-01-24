/* eslint-disable no-unused-vars */
import {
  COMPONENT_NAMES,
  CONDITION_THRESHOLD_TYPES,
  CONDITIONAL_OPERATORS,
  RECURRENCE_FREQUENCY_TYPES,
} from "../constants/triggerConst";

export namespace TriggerTypes {
  export type TriggerCondition = {
    operator: (typeof CONDITIONAL_OPERATORS)[keyof typeof CONDITIONAL_OPERATORS];
    sensorTag: string;
    threshold: number;
    thresholdType: (typeof CONDITION_THRESHOLD_TYPES)[keyof typeof CONDITION_THRESHOLD_TYPES];
  };

  export type Recurrence = {
    frequency?: (typeof RECURRENCE_FREQUENCY_TYPES)[keyof typeof RECURRENCE_FREQUENCY_TYPES];
    interval?: number; // Default is 1
    daysOfWeek?: number[]; // [0-6] for Monday to Sunday
    dayOfMonth?: number[];
    weekOfMonth?: number[];
    month?: number[];
  };

  export type TriggerConditionDetails = {
    operator: (typeof CONDITIONAL_OPERATORS)[keyof typeof CONDITIONAL_OPERATORS]; // The operator from the CONDITIONAL_OPERATORS enum
    sensorTag: string; // The associated sensor tag
    threshold: number; // The numeric threshold value
    thresholdType: (typeof CONDITION_THRESHOLD_TYPES)[keyof typeof CONDITION_THRESHOLD_TYPES]; // The threshold type from CONDITION_THRESHOLD_TYPES enum
  };

  export type Conditions = {
    resolutionFreq?: number;
    observationFreq?: number;
    resolutionConditions?: TriggerConditionDetails[][];
    observationConditions?: TriggerConditionDetails[][];
  };

  export type TriggerData = {
    componentName?: (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];
    componentData?: Record<string, any>;
  };
}
