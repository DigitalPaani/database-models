/* eslint-disable no-unused-vars */
import { Types } from "mongoose";
import {
  COMPONENT_NAMES,
  RECURRENCE_FREQUENCY_TYPES,
} from "../constants/triggerConst";

export namespace TriggerTypes {
  export type Recurrence = {
    frequency?: (typeof RECURRENCE_FREQUENCY_TYPES)[keyof typeof RECURRENCE_FREQUENCY_TYPES];
    interval?: number; // Default is 1 (e.g., every 1 day, 2 hours, etc.)
    daysOfWeek?: number[]; // [0-6] for Monday to Sunday
    dayOfMonth?: number[]; // Specific days in a month
    weekOfMonth?: number[]; // Specific weeks in a month
    month?: number[]; // Specific months in a year
    hours?: number[]; // [0-23] for hourly recurrence
    minutes?: number[]; // [0-59] for minutely recurrence
  };

  export type Conditions = {
    resolutionFreq?: number;
    observationFreq?: number;
    currentResolutionFreq?: number;
    currentObservationFreq?: number;
    resolutionSensorId?: Types.ObjectId;
    resolutionSensorTag?: string;
    observationSensorId?: Types.ObjectId;
    observationSensorTag?: string;
    resolutionTime?: number;
    resolutionValue?: number;
    resolutionUnit?: string;
  };

  export type TriggerData = {
    componentName?: (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];
    componentData?: Record<string, any>;
  };
}
