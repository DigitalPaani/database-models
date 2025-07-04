const TRIGGER_SCOPE = {
  system: "System",
  group: "Group",
};

const TRIGGER_TYPES = {
  onetime: "onetime",
  recurring: "recurring",
  conditional: "conditional",
  manualControl: "manualControl",
};

const COMPONENT_NAMES = {
  createTask: "Create Task",
  createIssue: "Create Issue",
  phoneCommunication: "Phone Communication",
  smsCommunication: "SMS Communication",
  emailCommunication: "Email Communication",
  whatsappCommunication: "Whatsapp Communication",
};

const RECURRENCE_FREQUENCY_TYPES = {
  daily: "DAILY",
  weekly: "WEEKLY",
  monthly: "MONTHLY",
  yearly: "YEARLY",
  custom: "CUSTOM",
  hourly: "HOURLY",
  minutely: "MINUTELY",
};

const TRIGGER_STATUS = {
  active: "Active",
  inactive: "Inactive",
};

const TRIGGER_COMPONENT_TYPES = {
  task: "TASK",
  issue: "ISSUE",
  communication: "COMMUNICATION",
  obsolete: "OBSOLETE",
  insight: "INSIGHT",
  equipments: "EQUIPMENTS",
  notification: "NOTIFICATION"
};

const COMMUNICATION_COMPONENT_TYPES = {
  email: "EMAIL",
  whatsapp: "WHATSAPP",
  call: "CALL",
  sms: "SMS",
};

const COMMUNICATION_COMPONENT_SERVICE_TYPE = {
  nodeBackend: "NODE_BACKEND",
  trigger: "TRIGGER",
};

const COMMUNICATION_UNITS = [
  { unit: "Kg", value: "KG" },
  { unit: "Ton", value: "TON" },
  { unit: "Liter", value: "L" },
  { unit: "Milliliter", value: "ML" },
  { unit: "Gram", value: "G" },
];

export {
  TRIGGER_SCOPE,
  TRIGGER_TYPES,
  COMPONENT_NAMES,
  RECURRENCE_FREQUENCY_TYPES,
  TRIGGER_STATUS,
  TRIGGER_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_TYPES,
  COMMUNICATION_COMPONENT_SERVICE_TYPE,
  COMMUNICATION_UNITS
};
