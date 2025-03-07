export const SKILL_TYPES = [
  {
    label: "Electrical",
    value: "ELECTRICAL",
  },
  {
    label: "Plant Manager",
    value: "PLANT_MANAGER",
  },
];

export const TASK_TYPES = [
  {
    label: "Electrical",
    value: "ELECTRICAL",
  },
  {
    label: "Plant Manager",
    value: "PLANT_MANAGER",
  },
];


export const SKILL_LEVELS = [
  {
    label: "Low",
    value: "LOW",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "High",
    value: "HIGH",
  },
];

export const CREATE_WORKFLOW_AVAILABLE_ACTIONS = [
  {
    navbar: {
      label: "Action",
      value: "ACTION",
    },
    availableOptions: [
      {
        label: "Assign to a different user",
        value: "ASSIGN_TO_A_DIFFERENT_USER",
      },
      { label: "Create Sub Task", value: "CREATE_SUB_TASK" },
    ],
  },
  {
    navbar: {
      label: "Communication",
      value: "COMMUNICATION",
    },
    availableOptions: [
      { label: "Send Whatsapp Message", value: "SEND_WHATSAPP_MESSAGE" },
      { label: "Send SMS", value: "SEND_SMS" },
      { label: "Send Email", value: "SEND_EMAIL" },
      { label: "Call", value: "CALL" },
    ],
  },
  // {
  //   navbar: {
  //     label: "Media",
  //     value: "MEDIA",
  //   },
  //   availableOptions: [{ label: "Upload Media", value: "UPLOAD_MEDIA" }],
  // },
];

export const TASK_COMPLETION_ENUMS = [
  {
    label: "Sensor Based",
    value: "SENSOR_BASED",
  },
  {
    label: "Manual Update",
    value: "MANUAL_UPDATE",
  },
];

export const ASSIGNEE_METHOD_ENUMS = [
  {
    label: "Shift Based",
    value: "SHIFT_BASED",
  },
  {
    label: "Skills Based",
    value: "SKILLS_BASED",
  },
  {
    label: "Emergency Based",
    value: "EMERGENCY_BASED",
  },
  {
    label: "Non Assigned task",
    value: "NON_ASSIGNED_TASK",
  },
  {
    label: "Fixed User",
    value: "FIXED_USER",
  },
];

export const ESCALATION_UNITS_ENUMS = [
  "MINUTES",
  "HOURS",
  "WEEKS",
  "DAYS",
  "MONTHS",
  "YEARS",
];

export const COMMUNICATION_MEDIUM_ENUMS = ["EMAIL", "SMS", "WHATSAPP", "CALL"];
