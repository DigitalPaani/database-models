"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BATCH_STATUS_ENUM = {
    PLANNED: "Planned",
    RUNNING: "Running",
    PAUSED: "Paused",
    COMPLETED: "Completed",
    FAILED: "Failed",
    SKIPPED: "Skipped",
};
const BATCH_DETECTION_ENUM = {
    EVENT_COMPLETION: "Event Completion",
    TIME_CYCLE: "Time Cycle",
};
const BATCH_TYPE_ENUM = {
    MANUAL: "Manual",
    AUTOMATED: "Automated",
    BYPASS: "Bypass",
    REGULAR: "Regular",
};
const WATER_TREATMENT_UNIT_ENUM = {
    LITER: "Liter",
    KILO_LITER: "Kilo Liter",
    MILLION_LITER: "Million Liter",
};
const BATCH_ACTION_ENUM = {
    START: "Start",
    END: "End",
};
const BATCH_DURATION_UNIT = {
    MINUTE: "Minute",
    HOUR: "Hour",
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
};
exports.default = {
    BATCH_STATUS_ENUM,
    BATCH_DETECTION_ENUM,
    BATCH_TYPE_ENUM,
    WATER_TREATMENT_UNIT_ENUM,
    BATCH_ACTION_ENUM,
    BATCH_DURATION_UNIT
};
