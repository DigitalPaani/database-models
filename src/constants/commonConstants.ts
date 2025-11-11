import {
  ASSIGNEE_METHOD_ENUMS,
  SKILL_LEVELS,
  SKILL_TYPES,
  TASK_TYPES,
  CREATE_WORKFLOW_AVAILABLE_ACTIONS,
  TASK_COMPLETION_ENUMS,
  ESCALATION_UNITS_ENUMS,
} from "./taskManagementConst";

import {
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
  COMMUNICATION_COMPONENT_TYPES,
  TRIGGER_COMPONENT_TYPES,
  TRIGGER_TYPES,
} from "./triggerConst";

import {
  INSIGHT_CLASSIFICATIONS,
  INSIGHT_TYPE_OBJECTS,
  EQUIPMENT_TYPES,
  INSIGHT_PRIORITIES
} from "./insights.constants";
import { VISUALIZATION_EQUIPMENT_TYPES_ENUMS } from "./visualization.constants";
import { SENSOR_TYPE } from "./data-logger.constant";
import { SENSOR_PURPOSE_TAGS } from "./sensorConst";
import COMMUNICATION_CONSTANTS from "./communication.constants";
import logbookTemplatesConstants from "./logbook-templates.constants";
import batchConstants from "./batch.constants";
import anomalyRecordConst from "./anomaly-record-const";
import { APP_LOGS_ACTION_ENUM, APP_LOGS_MODULE_NAME } from "./app-logs-const";

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

const OCR_CONSTANTS = {
    LOGBOOK_TEMPLATE_TYPES_ENUMS: logbookTemplatesConstants.LOGBOOK_TEMPLATE_TYPES_ENUMS,
    LOGBOOK_CATEGORY_TYPES_ENUMS: logbookTemplatesConstants.LOGBOOK_CATEGORY_TYPES_ENUMS,
    LOGBOOK_TEMPLATE_TYPES: logbookTemplatesConstants.LOGBOOK_TEMPLATE_TYPES,
    CATEGORY_TYPES: logbookTemplatesConstants.CATEGORY_TYPES,
};

export default {
  SKILL_LEVELS,
  SKILL_TYPES,
  TASK_TYPES,
  CREATE_WORKFLOW_AVAILABLE_ACTIONS,
  TASK_COMPLETION_ENUMS,
  ESCALATION_UNITS_ENUMS,
  EVENT_TYPES,
  TRIGGER_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
  ASSIGNEE_METHOD_ENUMS,
  OBSOLETE_CONDITIONS,
  TASK_OR_ISSUE_FILTERS,
  TRIGGER_TYPES,
  WHATSAPP_TEMPLATE_VARIABLES,
  USER_GROUP_OR_SYSTEM,
  INSIGHT_CLASSIFICATIONS,
  EQUIPMENT_TYPES,
  INSIGHT_TYPE_OBJECTS,
  INSIGHT_PRIORITIES,
  VISUALIZATION_EQUIPMENT_TYPES_ENUMS,
  WHATSAPP_TEMPLATE_ALLOWED_INPUTS,
  SENSOR_TYPE,
  SENSOR_PURPOSE_TAGS,
  REMOTE_CONTROL_STATUS,
  COMMUNICATION_FILE_CONSTANTS: COMMUNICATION_CONSTANTS,
  BATCH_CONSTANTS: batchConstants,
  ANOMALY_RECORD_SENSITIVITY: anomalyRecordConst.ANOMALY_RECORD_SENSITIVITY,
  OCR_CONSTANTS: OCR_CONSTANTS,
  APP_LOGS_ACTION_ENUM,
  APP_LOGS_MODULE_NAME,
};
