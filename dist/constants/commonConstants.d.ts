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
        equipments: string;
        notification: string;
        event: string;
        batch: string;
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
        all: string;
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
        manualControl: string;
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
        taskAndInsightsDetails: string;
        dashboardReportUnit: string;
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
    VISUALIZATION_EQUIPMENT_TYPES_ENUMS: string[];
    WHATSAPP_TEMPLATE_ALLOWED_INPUTS: {
        sensor: string;
        freeText: string;
        unit: string;
    };
    SENSOR_TYPE: {
        float: string;
        double: string;
        uint: string;
        int: string;
    };
    SENSOR_PURPOSE_TAGS: {
        key: string;
        abbr: string;
        name: string;
        category: string;
    }[];
    REMOTE_CONTROL_STATUS: {
        initiated: string;
        initiationFailed: string;
        published: string;
        publishFailed: string;
        acknowledged: string;
        acknowledgementFailed: string;
        executed: string;
        executionFailed: string;
        unknown: string;
    };
    COMMUNICATION_FILE_CONSTANTS: {
        DELIVERY_STATUS_ENUMS: string[];
        CONTENT_TEMPLATE_IDS: {
            new_insight: {
                template_id: string;
            };
            account_pending_updates: {
                template_id: string;
            };
            dashboard_report_ready: {
                template_id: string;
            };
        };
    };
    BATCH_CONSTANTS: {
        BATCH_STATUS_ENUM: {
            PLANNED: string;
            RUNNING: string;
            PAUSED: string;
            COMPLETED: string;
            FAILED: string;
            SKIPPED: string;
        };
        BATCH_DETECTION_ENUM: {
            EVENT_COMPLETION: string;
            TIME_CYCLE: string;
        };
        BATCH_TYPE_ENUM: {
            MANUAL: string;
            AUTOMATED: string;
            BYPASS: string;
            REGULAR: string;
        };
        WATER_TREATMENT_UNIT_ENUM: {
            LITER: string;
            KILO_LITER: string;
            MILLION_LITER: string;
        };
        BATCH_ACTION_ENUM: {
            START: string;
            END: string;
        };
        BATCH_DURATION_UNIT: {
            Minute: string;
            Hour: string;
            Day: string;
            Week: string;
            Month: string;
        };
    };
    ANOMALY_RECORD_SENSITIVITY: {
        LOW: string;
        MEDIUM: string;
        HIGH: string;
    };
    OCR_CONSTANTS: {
        LOGBOOK_TEMPLATE_TYPES_ENUMS: string[];
        LOGBOOK_CATEGORY_TYPES_ENUMS: string[];
        LOGBOOK_TEMPLATE_TYPES: {
            logbook: {
                label: string;
                value: string;
            };
            inventory: {
                label: string;
                value: string;
            };
        };
        CATEGORY_TYPES: {
            categoryOne: {
                label: string;
                value: string;
            };
            categoryTwo: {
                label: string;
                value: string;
            };
        };
    };
    BIO_HEALTH_TRACKER_CONSTANTS: {
        FLOC_STATES: string[];
        ERROR_CODES: string[];
        ERROR_STATES_WITH_MESSAGES: {
            E001: string;
            E002: string;
            E003: string;
            E004: string;
            E005: string;
            E006: string;
            E007: string;
        };
    };
    LOGS_ACTION_ENUM: {
        CREATED: string;
        UPDATED: string;
        DELETED: string;
    };
};
export default _default;
//# sourceMappingURL=commonConstants.d.ts.map