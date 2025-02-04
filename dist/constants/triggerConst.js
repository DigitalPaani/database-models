"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECURRENCE_FREQUENCY_TYPES = exports.COMPONENT_NAMES = exports.TRIGGER_TYPES = exports.TRIGGER_SCOPE = void 0;
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
};
exports.RECURRENCE_FREQUENCY_TYPES = RECURRENCE_FREQUENCY_TYPES;
