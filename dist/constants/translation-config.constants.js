"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_TYPES = exports.TRANSLATION_CONFIG = void 0;
const TRANSLATION_CONFIG_GLOBAL = [
    {
        name: "Hindi",
        code: "hi",
        fallback: "en",
        mtProvider: "aws_translate",
        preTranslateOnWrite: false,
    },
    {
        name: "English",
        code: "en",
        fallback: "en",
        mtProvider: "aws_translate",
        preTranslateOnWrite: true,
    },
];
const MODULE_CONFIG = {
    INSIGHT: {
        moduleType: "INSIGHT",
        fields: ["name", "description", "rcaContent", "richTextContent", "aiDescription"],
    },
    INSIGHT_TEMPLATES: {
        moduleType: "INSIGHT_TEMPLATES",
        fields: ["name", "description", "richTextContent", "rcaContent"],
    },
    INSIGHT_COMMENT: {
        moduleType: "INSIGHT_COMMENT",
        fields: ["comment"],
    },
    ASSETS: {
        moduleType: "ASSETS",
        fields: ["plantName"],
    },
    USERS: {
        moduleType: "USERS",
        fields: ["name"],
    },
    WIDGET: {
        moduleType: "WIDGET",
        fields: ["heading.english", "widgetName", "widgetNickName", "widgetDescription"],
    },
    SENSOR: {
        moduleType: "SENSOR",
        fields: ["sensorName", "sensorNickName"],
    },
    NEW_DASHBOARD_PAGES: {
        moduleType: "NEW_DASHBOARD_PAGES",
        fields: ["clusterName"],
    },
    SKILL_MANAGEMENT: {
        moduleType: "SKILL_MANAGEMENT",
        fields: ["name"],
    },
};
const TRANSLATION_CONFIG = {
    TRANSLATION_CONFIG_GLOBAL: TRANSLATION_CONFIG_GLOBAL,
    MODULE_CONFIG: MODULE_CONFIG,
};
exports.TRANSLATION_CONFIG = TRANSLATION_CONFIG;
const MODULE_TYPES = Object.values(MODULE_CONFIG).map(({ moduleType }) => moduleType);
exports.MODULE_TYPES = MODULE_TYPES;
