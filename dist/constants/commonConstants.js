"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskManagementConst_1 = require("./taskManagementConst");
const triggerConst_1 = require("./triggerConst");
const EVENT_TYPES = {
    formula: "formula",
    trigger: "trigger",
};
const OBSOLETE_CONDITIONS = {
    observation: "observation",
    resolution: "resolution",
};
exports.default = {
    skillLevels: taskManagementConst_1.skillLevels,
    skillTypes: taskManagementConst_1.skillTypes,
    createWorkflowAvailableActions: taskManagementConst_1.createWorkflowAvailableActions,
    taskCompletionEnums: taskManagementConst_1.taskCompletionEnums,
    escalationUnitsEnums: taskManagementConst_1.escalationUnitsEnums,
    EVENT_TYPES,
    TRIGGER_COMPONENT_TYPES: triggerConst_1.TRIGGER_COMPONENT_TYPES,
    COMMUNICATION_COMPONENT_TYPES: triggerConst_1.COMMUNICATION_COMPONENT_TYPES,
    COMMUNICATION_COMPONENT_SERVICE_TYPE: triggerConst_1.COMMUNICATION_COMPONENT_SERVICE_TYPE,
    assigneeMethodEnums: taskManagementConst_1.assigneeMethodEnums,
    OBSOLETE_CONDITIONS,
};
