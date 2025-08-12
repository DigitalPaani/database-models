"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DYNAMIC_NAME_TYPE_ENUMS = exports.INSIGHT_PRIORITIES = exports.EQUIPMENT_TYPES = exports.INSIGHT_TYPE_OBJECTS = exports.TYPES_OF_INSIGHTS = exports.TYPES_OF_INSIGHT_CLASSIFICATIONS = exports.INSIGHT_CLASSIFICATIONS = void 0;
exports.INSIGHT_CLASSIFICATIONS = [
    {
        label: "Achievement",
        value: "ACHIEVEMENT",
        allowedInsightTypes: [
            {
                label: "Improvement",
                value: "IMPROVEMENT",
            },
            {
                label: "Accomplishment",
                value: "ACCOMPLISHMENT",
            },
        ],
    },
    {
        label: "Alarm",
        value: "ALARM",
        allowedInsightTypes: [
            {
                label: "Warning",
                value: "WARNING",
            },
            {
                label: "Issue",
                value: "ISSUE",
            },
            {
                label: "Incident",
                value: "INCIDENT",
            },
        ],
    },
];
exports.TYPES_OF_INSIGHT_CLASSIFICATIONS = exports.INSIGHT_CLASSIFICATIONS.map((item) => item.value);
exports.TYPES_OF_INSIGHTS = exports.INSIGHT_CLASSIFICATIONS.flatMap((item) => item.allowedInsightTypes.map((type) => type.value));
exports.INSIGHT_TYPE_OBJECTS = Array.from(new Map(exports.INSIGHT_CLASSIFICATIONS.flatMap((classification) => classification.allowedInsightTypes).map((type) => [type.value, type])).values());
exports.EQUIPMENT_TYPES = [
    {
        label: "Tank",
        value: "TANK",
    },
    {
        label: "Valve",
        value: "VALVE",
    },
    {
        label: "Pump",
        value: "PUMP",
    },
    {
        label: "Blower",
        value: "BLOWER",
    },
    {
        label: "Filter",
        value: "FILTER",
    },
    {
        label: "Plant",
        value: "PLANT",
    },
];
exports.INSIGHT_PRIORITIES = [
    {
        label: "Low",
        value: 3,
    },
    {
        label: "Medium",
        value: 2,
    },
    {
        label: "High",
        value: 1,
    },
];
exports.DYNAMIC_NAME_TYPE_ENUMS = {
    equipment: 'EQUIPMENT'
};
