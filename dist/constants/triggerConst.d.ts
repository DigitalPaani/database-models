declare const TRIGGER_SCOPE: {
    system: string;
    group: string;
};
declare const TRIGGER_TYPES: {
    onetime: string;
    recurring: string;
    conditional: string;
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
declare const TRIGGER_STATUS: {
    active: string;
    inactive: string;
};
declare const TRIGGER_COMPONENT_TYPES: {
    task: string;
    issue: string;
    communication: string;
};
declare const COMMUNICATION_COMPONENT_TYPES: {
    email: string;
    whatsapp: string;
    call: string;
    sms: string;
};
declare const COMMUNICATION_COMPONENT_SERVICE_TYPE: {
    nodeBackend: string;
    trigger: string;
};
export { TRIGGER_SCOPE, TRIGGER_TYPES, COMPONENT_NAMES, RECURRENCE_FREQUENCY_TYPES, TRIGGER_STATUS, TRIGGER_COMPONENT_TYPES, COMMUNICATION_COMPONENT_TYPES, COMMUNICATION_COMPONENT_SERVICE_TYPE, };
//# sourceMappingURL=triggerConst.d.ts.map