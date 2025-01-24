const TRIGGER_SCOPE = {
  system: "System",
  group: "Group",
};

const TRIGGER_TYPES = {
  onetime: "onetime",
  recurring: "recurring",
  conditional: "conditional",
};

const CONDITION_THRESHOLD_TYPES = {
  numeric: "numeric",
  boolean: "boolean",
  time: "time",
};

const CONDITIONAL_OPERATORS = {
  EQ: "EQ",
  NEQ: "NEQ",
  GT: "GT",
  GTE: "GTE",
  LT: "LT",
  LTE: "LTE",
  AND: "AND",
  OR: "OR",
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
};

export {
  TRIGGER_SCOPE,
  TRIGGER_TYPES,
  CONDITION_THRESHOLD_TYPES,
  CONDITIONAL_OPERATORS,
  COMPONENT_NAMES,
  RECURRENCE_FREQUENCY_TYPES,
};
