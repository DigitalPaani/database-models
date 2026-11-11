"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistryEntry = exports.overrideRules = exports.typeCodeOf = void 0;
const equipment_constants_1 = require("../../constants/equipment.constants");
const validateLibraryType_1 = require("./validateLibraryType");
const OVERRIDE_FIELDS = {
    ALERT: ['direction', 'bands'],
    SCHEDULE: ['basis', 'every', 'meterHours', 'performedBy'],
    CONDITION_JOB: ['doWhen', 'doneWhen'],
};
const ALL_OVERRIDE_FIELDS = [...new Set(Object.values(OVERRIDE_FIELDS).flat())];
const isSet = (o, f) => (f === 'bands' ? o.bands !== undefined : o[f] != null);
const typeCodeOf = (entry) => entry.storedCode || entry.drawnCode || '';
exports.typeCodeOf = typeCodeOf;
const overrideRules = (o, report) => {
    if (!Object.prototype.hasOwnProperty.call(OVERRIDE_FIELDS, o.kind))
        return;
    const allowed = OVERRIDE_FIELDS[o.kind];
    ALL_OVERRIDE_FIELDS.filter((f) => !allowed.includes(f) && isSet(o, f)).forEach((f) => {
        report(f, `${o.kind} overrides cannot set ${f}`);
    });
    if (!o.off && !allowed.some((f) => isSet(o, f)))
        report('key', `override of ${o.key} changes nothing`);
    if (o.bands !== undefined) {
        if (!o.direction)
            report('direction', 'bands need a direction to be checked against');
        else {
            const problem = (0, validateLibraryType_1.bandsProblem)(o.bands, o.direction);
            if (problem)
                report('bands', problem);
        }
    }
    if (o.doWhen != null && o.doneWhen != null && o.doneWhen >= o.doWhen) {
        report('doneWhen', `must be below doWhen (${o.doWhen})`);
    }
};
exports.overrideRules = overrideRules;
const entryRules = (entry, report) => {
    const typeCode = (0, exports.typeCodeOf)(entry);
    const overrides = entry.overrides ?? [];
    if (equipment_constants_1.NON_EQUIPMENT_CODES.includes(typeCode)) {
        report('typeCode', `${typeCode} is drawn, not equipment: it has no place in the registry`);
    }
    if (entry.storedSource === 'explicit' && !entry.storedCode) {
        report('storedCode', 'an explicit stored type needs the code that was stored');
    }
    if (!entry.storedSource && entry.storedCode) {
        report('storedSource', 'say whether the stored type was chosen or is the shape default');
    }
    if (!entry.libraryTypeId) {
        if (entry.libraryVersion != null)
            report('libraryVersion', 'a machine not in the database inherits no version');
        if (entry.tierOverride)
            report('tierOverride', 'a machine not in the database has no library tier to override');
        if (overrides.length)
            report('overrides', 'a machine not in the database has no library items to override');
    }
    const seen = new Set();
    overrides.forEach((o, i) => {
        const id = `${o.kind}:${o.key}`;
        if (seen.has(id))
            report(`overrides.${i}.key`, `${id} is overridden twice`);
        seen.add(id);
    });
};
const validateRegistryEntry = (entry) => (0, validateLibraryType_1.collectViolations)((report, reported) => {
    entryRules(entry, report);
    (0, validateLibraryType_1.eachItem)(entry.overrides, 'overrides', exports.overrideRules, report, reported);
});
exports.validateRegistryEntry = validateRegistryEntry;
