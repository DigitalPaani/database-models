declare const TRIGGER_SCOPE: {
    system: string;
    group: string;
};
declare const TRIGGER_TYPES: {
    onetime: string;
    recurring: string;
    conditional: string;
};
declare const CONDITION_THRESHOLD_TYPES: {
    numeric: string;
    boolean: string;
    time: string;
};
declare const CONDITIONAL_OPERATORS: {
    EQ: string;
    NEQ: string;
    GT: string;
    GTE: string;
    LT: string;
    LTE: string;
    AND: string;
    OR: string;
};
declare const COMPONENT_NAMES: {
    createTask: string;
    createIssue: string;
    phoneCommunication: string;
    smsCommunication: string;
    emailCommunication: string;
    whatsappCommunication: string;
};
declare const RECURRENCE_FREQUENCY_TYPES: {
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
    custom: string;
};
export { TRIGGER_SCOPE, TRIGGER_TYPES, CONDITION_THRESHOLD_TYPES, CONDITIONAL_OPERATORS, COMPONENT_NAMES, RECURRENCE_FREQUENCY_TYPES, };
//# sourceMappingURL=triggerConst.d.ts.map