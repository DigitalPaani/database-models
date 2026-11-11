"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlantType = void 0;
const validateLibraryType_1 = require("./validateLibraryType");
const plantRules = (plantType, report) => {
    if (plantType.rounds === null)
        report('rounds', 'rounds must be a list: send [] for none');
    (plantType.rounds ?? []).forEach((r, i) => {
        if ((0, validateLibraryType_1.basisOf)(r) !== 'CALENDAR')
            report(`rounds.${i}.basis`, 'a plant round runs on the calendar');
    });
};
const validatePlantType = (plantType) => (0, validateLibraryType_1.collectViolations)((report, reported) => {
    plantRules(plantType, report);
    (0, validateLibraryType_1.eachItem)(plantType.rounds, 'rounds', validateLibraryType_1.scheduleRules, report, reported);
});
exports.validatePlantType = validatePlantType;
