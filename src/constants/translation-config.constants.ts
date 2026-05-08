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



const INSIGHT_TEMPLATE_CONFIG = {
    moduleType: "INSIGHT_TEMPLATES",
    fields: ["name", "description", "richTextContent", "rcaContent"]
};

export { TRANSLATION_CONFIG, INSIGHT_TEMPLATE_CONFIG };
