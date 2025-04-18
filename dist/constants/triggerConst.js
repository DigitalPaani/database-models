"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNICATION_COMPONENT_SERVICE_TYPE = exports.COMMUNICATION_COMPONENT_TYPES = exports.TRIGGER_COMPONENT_TYPES = exports.TRIGGER_STATUS = exports.RECURRENCE_FREQUENCY_TYPES = exports.COMPONENT_NAMES = exports.TRIGGER_TYPES = exports.TRIGGER_SCOPE = void 0;
const TRIGGER_SCOPE = {
    system: "System",
    group: "Group",
};
exports.TRIGGER_SCOPE = TRIGGER_SCOPE;
const TRIGGER_TYPES = {
    onetime: "onetime",
    recurring: "recurring",
    conditional: "conditional",
};
exports.TRIGGER_TYPES = TRIGGER_TYPES;
const COMPONENT_NAMES = {
    createTask: "Create Task",
    createIssue: "Create Issue",
    phoneCommunication: "Phone Communication",
    smsCommunication: "SMS Communication",
    emailCommunication: "Email Communication",
    whatsappCommunication: "Whatsapp Communication",
};
exports.COMPONENT_NAMES = COMPONENT_NAMES;
const RECURRENCE_FREQUENCY_TYPES = {
    daily: "DAILY",
    weekly: "WEEKLY",
    monthly: "MONTHLY",
    yearly: "YEARLY",
    custom: "CUSTOM",
    hourly: "HOURLY",
    minutely: "MINUTELY",
};
exports.RECURRENCE_FREQUENCY_TYPES = RECURRENCE_FREQUENCY_TYPES;
const TRIGGER_STATUS = {
    active: "Active",
    inactive: "Inactive",
};
exports.TRIGGER_STATUS = TRIGGER_STATUS;
const TRIGGER_COMPONENT_TYPES = {
    task: "TASK",
    issue: "ISSUE",
    communication: "COMMUNICATION",
    obsolete: "OBSOLETE",
    insight: "INSIGHT"
};
exports.TRIGGER_COMPONENT_TYPES = TRIGGER_COMPONENT_TYPES;
const COMMUNICATION_COMPONENT_TYPES = {
    email: "EMAIL",
    whatsapp: "WHATSAPP",
    call: "CALL",
    sms: "SMS",
};
exports.COMMUNICATION_COMPONENT_TYPES = COMMUNICATION_COMPONENT_TYPES;
const COMMUNICATION_COMPONENT_SERVICE_TYPE = {
    nodeBackend: "NODE_BACKEND",
    trigger: "TRIGGER",
};
exports.COMMUNICATION_COMPONENT_SERVICE_TYPE = COMMUNICATION_COMPONENT_SERVICE_TYPE;
