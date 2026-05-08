"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSLATION_CONFIG = void 0;
const TRANSLATION_CONFIG = [
    {
        name: "Hindi",
        code: "hi",
        fallback: "en",
        mtProvider: "amazon",
        preTranslateOnWrite: true,
    },
    {
        name: "English",
        code: "en",
        fallback: "en",
        mtProvider: "amazon",
        preTranslateOnWrite: true,
    },
];
exports.TRANSLATION_CONFIG = TRANSLATION_CONFIG;
