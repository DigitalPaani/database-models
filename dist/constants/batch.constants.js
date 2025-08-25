"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BATCH_TYPE_ENUM = exports.BATCH_DETECTION_ENUM = exports.BATCH_STATUS_ENUM = void 0;
exports.BATCH_STATUS_ENUM = {
    PLANNED: "Planned",
    RUNNING: "Running",
    PAUSED: "Paused",
    COMPLETED: "Completed",
    FAILED: "Failed",
    SKIPPED: "Skipped"
};
exports.BATCH_DETECTION_ENUM = {
    EVENT_COMPLETION: "Event Completion",
    TIME_CYCLE: "Time Cycle"
};
exports.BATCH_TYPE_ENUM = {
    MANUAL: "Manual",
    AUTOMATED: "Automated",
    BYPASS: "Bypass",
    REGULAR: "Regular"
};
