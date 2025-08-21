"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOGBOOK_TEMPLATE_TYPES = {
    logbook: {
        label: "Logbook",
        value: "LOGBOOK"
    },
    inventory: {
        label: "Inventory",
        value: "INVENTORY"
    }
};
const CATEGORY_TYPES = {
    logbook: {
        label: "Category-1",
        value: "CATEGORY-1"
    },
    inventory: {
        label: "Category-2",
        value: "CATEGORY-2"
    }
};
// Extract only values
const LOGBOOK_TEMPLATE_TYPES_ENUMS = Object.values(LOGBOOK_TEMPLATE_TYPES).map(item => item.value);
const LOGBOOK_CATEGORY_TYPES_ENUMS = Object.values(CATEGORY_TYPES).map(item => item.value);
exports.default = {
    LOGBOOK_TEMPLATE_TYPES_ENUMS,
    LOGBOOK_CATEGORY_TYPES_ENUMS,
    LOGBOOK_TEMPLATE_TYPES,
    CATEGORY_TYPES
};
