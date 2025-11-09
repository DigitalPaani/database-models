"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = exports.FLOC_STATES = void 0;
const FLOC_STATES = [
    '30Mark',
    '60Mark',
    '90Mark',
    'floatingSludge'
];
exports.FLOC_STATES = FLOC_STATES;
const ERROR_STATES_WITH_MESSAGES = {
    'E001': 'No Beaker Detected',
    'E002': 'Multiple Beakers Detected',
    'E003': 'Multiple Sludge Detected',
    'E004': 'Unable To Load Image',
    'E005': 'CPU Overheating',
};
const ERROR_CODES = Object.keys(ERROR_STATES_WITH_MESSAGES);
exports.ERROR_CODES = ERROR_CODES;
