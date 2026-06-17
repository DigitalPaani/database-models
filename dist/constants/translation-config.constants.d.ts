declare const MODULE_CONFIG: {
    INSIGHT: {
        moduleType: string;
        fields: string[];
    };
    INSIGHT_TEMPLATES: {
        moduleType: string;
        fields: string[];
    };
    INSIGHT_COMMENT: {
        moduleType: string;
        fields: string[];
    };
    ASSETS: {
        moduleType: string;
        fields: string[];
    };
    USERS: {
        moduleType: string;
        fields: string[];
    };
    WIDGET: {
        moduleType: string;
        fields: string[];
    };
    SENSOR: {
        moduleType: string;
        fields: string[];
    };
    NEW_DASHBOARD_PAGES: {
        moduleType: string;
        fields: string[];
    };
    SKILL_MANAGEMENT: {
        moduleType: string;
        fields: string[];
    };
};
declare const TRANSLATION_CONFIG: {
    TRANSLATION_CONFIG_GLOBAL: {
        name: string;
        code: string;
        fallback: string;
        mtProvider: string;
        preTranslateOnWrite: boolean;
    }[];
    MODULE_CONFIG: {
        INSIGHT: {
            moduleType: string;
            fields: string[];
        };
        INSIGHT_TEMPLATES: {
            moduleType: string;
            fields: string[];
        };
        INSIGHT_COMMENT: {
            moduleType: string;
            fields: string[];
        };
        ASSETS: {
            moduleType: string;
            fields: string[];
        };
        USERS: {
            moduleType: string;
            fields: string[];
        };
        WIDGET: {
            moduleType: string;
            fields: string[];
        };
        SENSOR: {
            moduleType: string;
            fields: string[];
        };
        NEW_DASHBOARD_PAGES: {
            moduleType: string;
            fields: string[];
        };
        SKILL_MANAGEMENT: {
            moduleType: string;
            fields: string[];
        };
    };
};
type ModuleType = keyof typeof MODULE_CONFIG;
declare const MODULE_TYPES: string[];
export { TRANSLATION_CONFIG, MODULE_TYPES, ModuleType };
//# sourceMappingURL=translation-config.constants.d.ts.map