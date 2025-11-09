const FLOC_STATES = [
    '30Mark',
    '60Mark',
    '90Mark',
    'floatingSludge'
];

const ERROR_STATES_WITH_MESSAGES = {
    'E001': 'No Beaker Detected',
    'E002': 'Multiple Beakers Detected',
    'E003': 'Multiple Sludge Detected',
    'E004': 'Unable To Load Image',
    'E005': 'CPU Overheating',
};

const ERROR_CODES = Object.keys(ERROR_STATES_WITH_MESSAGES)

export default {
    FLOC_STATES,
    ERROR_CODES
};