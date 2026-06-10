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

const INSIGHT_COMMENT_CONFIG = {
    moduleType: "INSIGHT_COMMENT",
    fields: ["comment"]
};

const USER_CONFIG = {
    moduleType: "USERS",
    fields: ["name"]
};

const WIDGET_CONFIG = {
    moduleType: "WIDGET",
    fields: ["heading.english", "widgetName", "widgetNickName", "widgetDescription"]
};

const SENSOR_CONFIG = {
    moduleType: "SENSOR",
    fields: ["sensorName", "sensorNickName"] 
};

const NEW_DASHBOARD_CONFIG = {
    moduleType: "NEW_DASHBOARD_PAGES",
    fields: ["clusterName"] 
};

const SKILL_MANAGEMENT_CONFIG = {
    moduleType: "SKILL_MANAGEMENT",
    fields: ["name"] 
};

const TRANSLATION_CONFIG = {
  TRANSLATION_CONFIG_GLOBAL: TRANSLATION_CONFIG_GLOBAL,
  INSIGHT_TEMPLATE_CONFIG: INSIGHT_TEMPLATE_CONFIG,
  ASSETS_CONFIG: ASSETS_CONFIG,
  INSIGHT_CONFIG: INSIGHT_CONFIG,
  WIDGET_CONFIG: WIDGET_CONFIG,
  SENSOR_CONFIG: SENSOR_CONFIG,
  INSIGHT_COMMENT_CONFIG: INSIGHT_COMMENT_CONFIG,
  USER_CONFIG: USER_CONFIG,
  NEW_DASHBOARD_CONFIG: NEW_DASHBOARD_CONFIG,
  SKILL_MANAGEMENT_CONFIG: SKILL_MANAGEMENT_CONFIG
};

export { TRANSLATION_CONFIG };
