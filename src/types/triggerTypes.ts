/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import {
  COMPONENT_NAMES,
  RECURRENCE_FREQUENCY_TYPES,
} from "../constants/triggerConst";

export namespace TriggerTypes {
  export type Recurrence = {
    frequency?: (typeof RECURRENCE_FREQUENCY_TYPES)[keyof typeof RECURRENCE_FREQUENCY_TYPES];
    interval?: number; // Default is 1
    daysOfWeek?: number[]; // [0-6] for Monday to Sunday
    dayOfMonth?: number[];
    weekOfMonth?: number[];
    month?: number[];
  };

  export type Conditions = {
    resolutionFreq?: number;
    observationFreq?: number;
    currentResolutionFreq?: number;
    currentObservationFreq?: number;
    resolutionSensorId?: Types.ObjectId;
    observationSensorId?: Types.ObjectId;
    resolutionTime?: number;
  };

  export type TriggerData = {
    componentName?: (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];
    componentData?: Record<string, any>;
  };
}
