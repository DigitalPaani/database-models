

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

export const INSIGHT_CLASSIFICATIONS = [
  {
    label: "Positive",
    value: "POSITIVE",
    allowedInsightTypes: [
      {
        label: "Achievements",
        value: "ACHIEVEMENTS",
      },
    ],
  },
  {
    label: "Negative",
    value: "NEGATIVE",
    allowedInsightTypes: [
      {
        label: "Issues",
        value: "ISSUES",
      },
      {
        label: "Incidents",
        value: "INCIDENTS",
      },
      {
        label: "Warning",
        value: "WARNING",
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

export const EQUIPMENT_TYPES = [
  {
    label: "Sensors",
    value: "SENSORS",
  },
  {
    label: "Valves",
    value: "VALVES",
  },
];
