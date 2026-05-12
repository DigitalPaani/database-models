"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSLATION_CONFIG = void 0;
const TRANSLATION_CONFIG_GLOBAL = [
    {
        name: "Hindi",
        code: "hi",
        fallback: "en",
        mtProvider: "aws_translate",
        preTranslateOnWrite: true,
    },
    {
        name: "English",
        code: "en",
        fallback: "en",
        mtProvider: "aws_translate",
        preTranslateOnWrite: true,
    },
];
const INSIGHT_TEMPLATE_CONFIG = {
    moduleType: "INSIGHT_TEMPLATES",
    fields: ["name", "description", "richTextContent", "rcaContent"]
};
const ASSETS_CONFIG = {
    moduleType: "ASSETS",
    fields: ["plantName"]
};
const INSIGHT_CONFIG = {
    moduleType: "INSIGHT",
    fields: ["name", "description", "rcaContent", "richTextContent", "aiDescription"]
};
const TRANSLATION_CONFIG = {
    TRANSLATION_CONFIG_GLOBAL: TRANSLATION_CONFIG_GLOBAL,
    INSIGHT_TEMPLATE_CONFIG: INSIGHT_TEMPLATE_CONFIG,
    ASSETS_CONFIG: ASSETS_CONFIG,
    INSIGHT_CONFIG: INSIGHT_CONFIG
};
exports.TRANSLATION_CONFIG = TRANSLATION_CONFIG;
