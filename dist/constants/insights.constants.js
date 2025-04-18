"use strict";
// export const INSIGHT_CLASSIFICATION = [
//   {
//     label: "Positive",
//     value: "POSITIVE"
//   },
//   {
//     label: "Negative",
//     value: "NEGATIVE",
//   }
// ]
Object.defineProperty(exports, "__esModule", { value: true });
exports.EQUIPMENT_TYPES = exports.INSIGHT_TYPE_OBJECTS = exports.TYPES_OF_INSIGHTS = exports.TYPES_OF_INSIGHT_CLASSIFICATIONS = exports.INSIGHT_CLASSIFICATIONS = void 0;
// export const TYPES_OF_INSIGHTS = [
//   {
//     label: "Achievements",
//     value: "ACHIEVEMENTS",
//   },
//   {
//     label: "Issues",
//     value: "ISSUES",
//   },
//   {
//     label: "Incidents",
//     value: "INCIDENTS",
//   },
//   {
//     label: "Warning",
//     value: "WARNING",
//   },
// ];
exports.INSIGHT_CLASSIFICATIONS = [
    {
        label: "Positive",
        value: "POSITIVE",
        allowedInsightTypes: [
            {
                label: "Achievement",
                value: "ACHIEVEMENT",
            },
        ],
    },
    {
        label: "Negative",
        value: "NEGATIVE",
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
        label: "Sensors",
        value: "SENSORS",
    },
    {
        label: "Valves",
        value: "VALVES",
    },
];
