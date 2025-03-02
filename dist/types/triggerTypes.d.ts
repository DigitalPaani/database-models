import { Types } from "mongoose";
import { COMPONENT_NAMES, RECURRENCE_FREQUENCY_TYPES } from "../constants/triggerConst";
export declare namespace TriggerTypes {
    type Recurrence = {
        frequency?: (typeof RECURRENCE_FREQUENCY_TYPES)[keyof typeof RECURRENCE_FREQUENCY_TYPES];
        interval?: number;
        daysOfWeek?: number[];
        dayOfMonth?: number[];
        weekOfMonth?: number[];
        month?: number[];
        occurrences?: number;
    };
    type Conditions = {
        resolutionFreq?: number;
        observationFreq?: number;
        currentResolutionFreq?: number;
        currentObservationFreq?: number;
        resolutionSensorId?: Types.ObjectId;
        resolutionSensorTag?: string;
        observationSensorId?: Types.ObjectId;
        observationSensorTag?: string;
        resolutionTime?: number;
        resolutionValue?: Number;
        resolutionUnit?: Number;
    };
    type TriggerData = {
        componentName?: (typeof COMPONENT_NAMES)[keyof typeof COMPONENT_NAMES];
        componentData?: Record<string, any>;
    };
}
//# sourceMappingURL=triggerTypes.d.ts.map