declare const _default: {
    SKILL_LEVELS: {
        label: string;
        value: string;
    }[];
    SKILL_TYPES: {
        label: string;
        value: string;
    }[];
    TASK_TYPES: {
        label: string;
        value: string;
    }[];
    CREATE_WORKFLOW_AVAILABLE_ACTIONS: {
        navbar: {
            label: string;
            value: string;
        };
        availableOptions: {
            label: string;
            value: string;
        }[];
    }[];
    TASK_COMPLETION_ENUMS: {
        label: string;
        value: string;
    }[];
    ESCALATION_UNITS_ENUMS: string[];
    EVENT_TYPES: {
        formula: string;
        trigger: string;
    };
    TRIGGER_COMPONENT_TYPES: {
        task: string;
        issue: string;
        communication: string;
        obsolete: string;
        insight: string;
    };
    COMMUNICATION_COMPONENT_TYPES: {
        email: string;
        whatsapp: string;
        call: string;
        sms: string;
    };
    COMMUNICATION_COMPONENT_SERVICE_TYPE: {
        nodeBackend: string;
        trigger: string;
    };
    ASSIGNEE_METHOD_ENUMS: {
        label: string;
        value: string;
    }[];
    OBSOLETE_CONDITIONS: {
        observation: string;
        resolution: string;
        none: string;
    };
    TASK_OR_ISSUE_FILTERS: {
        open: string;
        highPriorityOpen: string;
        mediumPriorityOpen: string;
        lowPriorityOpen: string;
        closed: string;
        highPriorityClosed: string;
        mediumPriorityClosed: string;
        lowPriorityClosed: string;
    };
    TRIGGER_TYPES: {
        onetime: string;
        recurring: string;
        conditional: string;
    };
    WHATSAPP_TEMPLATE_VARIABLES: {
        plantName: string;
        issueName: string;
        issueTime: string;
        taskName: string;
        taskTime: string;
        userName: string;
        transitionName: string;
        overdueTime: string;
    };
    USER_GROUP_OR_SYSTEM: {
        value: string;
        label: string;
    }[];
    INSIGHT_CLASSIFICATIONS: {
        label: string;
        value: string;
        allowedInsightTypes: {
            label: string;
            value: string;
        }[];
    }[];
    EQUIPMENT_TYPES: {
        label: string;
        value: string;
    }[];
    INSIGHT_TYPE_OBJECTS: {
        label: string;
        value: string;
    }[];
    INSIGHT_PRIORITIES: {
        label: string;
        value: number;
    }[];
};
export default _default;
//# sourceMappingURL=commonConstants.d.ts.map