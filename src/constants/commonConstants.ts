import {
  ASSIGNEE_METHOD_ENUMS,
  SKILL_LEVELS,
  SKILL_TYPES,
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

const EVENT_TYPES = {
  formula: "formula",
  trigger: "trigger",
};

const OBSOLETE_CONDITIONS = {
  observation: "observation",
  resolution: "resolution",
};

const TASK_OR_ISSUE_FILTERS = {
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

export default {
  SKILL_LEVELS,
  SKILL_TYPES,
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
  USER_GROUP_OR_SYSTEM
};
