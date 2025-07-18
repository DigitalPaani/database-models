"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskManagementConst_1 = require("./taskManagementConst");
const triggerConst_1 = require("./triggerConst");
const insights_constants_1 = require("./insights.constants");
const visualization_constants_1 = require("./visualization.constants");
const data_logger_constant_1 = require("./data-logger.constant");
const sensorConst_1 = require("./sensorConst");
const communication_constants_1 = __importDefault(require("./communication.constants"));
const EVENT_TYPES = {
    formula: "formula",
    trigger: "trigger",
};
const OBSOLETE_CONDITIONS = {
    observation: "observation",
    resolution: "resolution",
    none: "none",
};
const TASK_OR_ISSUE_FILTERS = {
    all: "All",
    open: "Open",
    highPriorityOpen: "High Priority Open",
    mediumPriorityOpen: "Medium Priority Open",
    lowPriorityOpen: "Low Priority Open",
    closed: "Closed",
    highPriorityClosed: "High Priority Closed",
    mediumPriorityClosed: "Medium Priority Closed",
    lowPriorityClosed: "Low Priority Closed",
};
const WHATSAPP_TEMPLATE_VARIABLES = {
    plantName: "PLANT_NAME",
    issueName: "ISSUE_NAME",
    issueTime: "ISSUE_TIME",
    taskName: "TASK_NAME",
    taskTime: "TASK_TIME",
    userName: "USER_NAME",
    transitionName: "TRANSITION_NAME",
    overdueTime: "OVERDUE_TIME",
    taskAndInsightsDetails: "TASK_AND_INSIGHTS_DETAILS",
    dashboardReportUnit: "DASHBOARD_REPORT_UNIT",
};
const WHATSAPP_TEMPLATE_ALLOWED_INPUTS = {
    sensor: "SENSOR",
    freeText: "FREE_TEXT",
    unit: "UNIT"
};
const USER_GROUP_OR_SYSTEM = [
    {
        value: "SYSTEM",
        label: "System",
    },
    {
        value: "USER_GROUP",
        label: "User Group",
    },
];
const REMOTE_CONTROL_STATUS = {
    initiated: "Initiated",
    initiationFailed: "Initiation Failed",
    published: "Published",
    publishFailed: "Publish Failed",
    acknowledged: "Acknowledged",
    acknowledgementFailed: "Acknowledgement Failed",
    executed: "Executed",
    executionFailed: "Execution Failed",
    unknown: "Unknown",
};
exports.default = {
    SKILL_LEVELS: taskManagementConst_1.SKILL_LEVELS,
    SKILL_TYPES: taskManagementConst_1.SKILL_TYPES,
    TASK_TYPES: taskManagementConst_1.TASK_TYPES,
    CREATE_WORKFLOW_AVAILABLE_ACTIONS: taskManagementConst_1.CREATE_WORKFLOW_AVAILABLE_ACTIONS,
    TASK_COMPLETION_ENUMS: taskManagementConst_1.TASK_COMPLETION_ENUMS,
    ESCALATION_UNITS_ENUMS: taskManagementConst_1.ESCALATION_UNITS_ENUMS,
    EVENT_TYPES,
    TRIGGER_COMPONENT_TYPES: triggerConst_1.TRIGGER_COMPONENT_TYPES,
    COMMUNICATION_COMPONENT_TYPES: triggerConst_1.COMMUNICATION_COMPONENT_TYPES,
    COMMUNICATION_COMPONENT_SERVICE_TYPE: triggerConst_1.COMMUNICATION_COMPONENT_SERVICE_TYPE,
    ASSIGNEE_METHOD_ENUMS: taskManagementConst_1.ASSIGNEE_METHOD_ENUMS,
    OBSOLETE_CONDITIONS,
    TASK_OR_ISSUE_FILTERS,
    TRIGGER_TYPES: triggerConst_1.TRIGGER_TYPES,
    WHATSAPP_TEMPLATE_VARIABLES,
    USER_GROUP_OR_SYSTEM,
    INSIGHT_CLASSIFICATIONS: insights_constants_1.INSIGHT_CLASSIFICATIONS,
    EQUIPMENT_TYPES: insights_constants_1.EQUIPMENT_TYPES,
    INSIGHT_TYPE_OBJECTS: insights_constants_1.INSIGHT_TYPE_OBJECTS,
    INSIGHT_PRIORITIES: insights_constants_1.INSIGHT_PRIORITIES,
    VISUALIZATION_EQUIPMENT_TYPES_ENUMS: visualization_constants_1.VISUALIZATION_EQUIPMENT_TYPES_ENUMS,
    WHATSAPP_TEMPLATE_ALLOWED_INPUTS,
    SENSOR_TYPE: data_logger_constant_1.SENSOR_TYPE,
    SENSOR_PURPOSE_TAGS: sensorConst_1.SENSOR_PURPOSE_TAGS,
    REMOTE_CONTROL_STATUS,
    COMMUNICATION_FILE_CONSTANTS: communication_constants_1.default,
};
