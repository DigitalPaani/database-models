"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNICATION_MEDIUM_ENUMS = exports.ESCALATION_UNITS_ENUMS = exports.ASSIGNEE_METHOD_ENUMS = exports.TASK_COMPLETION_ENUMS = exports.CREATE_WORKFLOW_AVAILABLE_ACTIONS = exports.SKILL_LEVELS = exports.SKILL_TYPES = void 0;
exports.SKILL_TYPES = [
    {
        label: "Electrical",
        value: "ELECTRICAL",
    },
    {
        label: "Plant Manager",
        value: "PLANT_MANAGER",
    },
];
exports.SKILL_LEVELS = [
    {
        label: "Low",
        value: "LOW",
    },
    {
        label: "Medium",
        value: "MEDIUM",
    },
    {
        label: "High",
        value: "HIGH",
    },
];
exports.CREATE_WORKFLOW_AVAILABLE_ACTIONS = [
    {
        navbar: {
            label: "Action",
            value: "ACTION",
        },
        availableOptions: [
            {
                label: "Assign to a different user",
                value: "ASSIGN_TO_A_DIFFERENT_USER",
            },
            { label: "Create Sub Task", value: "CREATE_SUB_TASK" },
        ],
    },
    {
        navbar: {
            label: "Communication",
            value: "COMMUNICATION",
        },
        availableOptions: [
            { label: "Send Whatsapp Message", value: "SEND_WHATSAPP_MESSAGE" },
            { label: "Send SMS", value: "SEND_SMS" },
            { label: "Send Email", value: "SEND_EMAIL" },
            { label: "Call", value: "CALL" },
        ],
    },
    {
        navbar: {
            label: "Media",
            value: "MEDIA",
        },
        availableOptions: [{ label: "Upload Media", value: "UPLOAD_MEDIA" }],
    },
];
exports.TASK_COMPLETION_ENUMS = [
    {
        label: "Sensor Based",
        value: "SENSOR_BASED",
    },
    {
        label: "Manual Update",
        value: "MANUAL_UPDATE",
    },
];
exports.ASSIGNEE_METHOD_ENUMS = [
    {
        label: "Shift Based",
        value: "SHIFT_BASED",
    },
    {
        label: "Skills Based",
        value: "SKILLS_BASED",
    },
    {
        label: "Emergency Based",
        value: "EMERGENCY_BASED",
    },
    {
        label: "Non Assigned task",
        value: "NON_ASSIGNED_TASK",
    },
    {
        label: "Fixed User",
        value: "FIXED_USER",
    },
];
exports.ESCALATION_UNITS_ENUMS = [
    "MINUTES",
    "HOURS",
    "WEEKS",
    "DAYS",
    "MONTHS",
    "YEARS",
];
exports.COMMUNICATION_MEDIUM_ENUMS = ["EMAIL", "SMS", "WHATSAPP", "CALL"];
