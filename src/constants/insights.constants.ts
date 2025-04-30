
export const INSIGHT_CLASSIFICATIONS = [
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

export const TYPES_OF_INSIGHT_CLASSIFICATIONS = INSIGHT_CLASSIFICATIONS.map(
  (item) => item.value
);

export const TYPES_OF_INSIGHTS = INSIGHT_CLASSIFICATIONS.flatMap(
  (item) => item.allowedInsightTypes.map((type) => type.value)
);

export const INSIGHT_TYPE_OBJECTS = Array.from(
  new Map(
    INSIGHT_CLASSIFICATIONS.flatMap((classification) =>
      classification.allowedInsightTypes
    ).map((type) => [type.value, type])
  ).values()
);

export const EQUIPMENT_TYPES = [
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
];
