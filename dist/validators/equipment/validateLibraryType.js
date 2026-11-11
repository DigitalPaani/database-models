"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLibraryType = exports.eachItem = exports.formRuleRules = exports.conditionJobRules = exports.scheduleRules = exports.basisOf = exports.alertRules = exports.knownReading = exports.collectViolations = exports.under = void 0;
exports.bandsProblem = bandsProblem;
exports.patternProblem = patternProblem;
const closeTheLoop_constants_1 = require("../../constants/closeTheLoop.constants");
const equipment_constants_1 = require("../../constants/equipment.constants");
const under = (report, prefix) => (path, message, code) => report(`${prefix}.${path}`, message, code);
exports.under = under;
const orDefault = (value, fallback) => (value === undefined ? fallback : value);
const collectViolations = (check) => {
    const byPath = new Map();
    check((path, message, code = 'RULE') => {
        if (!byPath.has(path))
            byPath.set(path, { path, code, message });
    }, (path) => byPath.has(path));
    return [...byPath.values()];
};
exports.collectViolations = collectViolations;
const knownReading = (name, path, report) => {
    if (name != null && !(0, equipment_constants_1.isKnownReading)(name))
        report(path, `${String(name)} is not a reading the library knows`, 'ENUM');
};
exports.knownReading = knownReading;
const entriesOf = (map) => {
    if (map instanceof Map)
        return [...map.entries()];
    return map && typeof map === 'object' ? Object.entries(map) : [];
};
function bandsProblem(bands, direction) {
    const seen = new Set();
    for (const b of bands) {
        if (seen.has(b.severity))
            return `${b.severity} appears twice`;
        seen.add(b.severity);
    }
    const ordered = [...bands].sort((a, b) => closeTheLoop_constants_1.SEVERITY_RANK[a.severity] - closeTheLoop_constants_1.SEVERITY_RANK[b.severity]);
    for (let i = 1; i < ordered.length; i++) {
        const worse = ordered[i].threshold;
        const milder = ordered[i - 1].threshold;
        if (direction === 'ABOVE' ? worse <= milder : worse >= milder) {
            return `${ordered[i].severity} at ${worse} must be ${direction === 'ABOVE' ? 'above' : 'below'} ${ordered[i - 1].severity} at ${milder}`;
        }
    }
    return null;
}
function patternProblem(pattern, flags) {
    try {
        new RegExp(pattern, flags ?? '');
        return null;
    }
    catch (error) {
        return `/${pattern}/${flags ?? ''} is not a valid pattern: ${error.message}`;
    }
}
const alertRules = (alert, report) => {
    const bands = orDefault(alert.bands, []);
    if (bands == null) {
        report('bands', 'bands must be a list: an alert needs at least one band');
        return;
    }
    if (!(0, equipment_constants_1.isKnownReading)(alert.reading))
        return;
    if (!(0, equipment_constants_1.isOnEquipment)(alert.reading)) {
        report('reading', `${alert.reading} is read on a connection: keep this alert in nextPhase.alerts`);
    }
    if (alert.gate && (0, equipment_constants_1.isKnownReading)(alert.gate) && equipment_constants_1.READINGS[alert.gate].kind !== 'STATUS') {
        report('gate', `the gate must be an on/off reading, not ${alert.gate}`);
    }
    const kind = equipment_constants_1.READINGS[alert.reading].kind;
    if (kind === 'METER')
        report('reading', `${alert.reading} only climbs: schedule on it instead of alerting`);
    if (!bands.length)
        report('bands', 'an alert needs at least one band');
    if (kind === 'STATUS') {
        const [band] = bands;
        if (bands.length !== 1 || band.threshold !== 1 || alert.direction !== 'ABOVE') {
            report('bands', `${alert.reading} is on/off: one band at threshold 1, direction ABOVE`);
        }
        return;
    }
    const problem = bandsProblem(bands, alert.direction);
    if (problem)
        report('bands', problem);
};
exports.alertRules = alertRules;
const basisOf = (schedule) => orDefault(schedule.basis, 'CALENDAR');
exports.basisOf = basisOf;
const scheduleRules = (schedule, report) => {
    const basis = (0, exports.basisOf)(schedule);
    if (basis !== 'METER' && !schedule.every)
        report('every', `a ${basis} schedule needs a calendar cadence`);
    if (basis !== 'CALENDAR' && schedule.meterHours == null)
        report('meterHours', `a ${basis} schedule needs run-hours`);
};
exports.scheduleRules = scheduleRules;
const conditionJobRules = (job, report) => {
    if ((0, equipment_constants_1.isKnownReading)(job.reading) && !(0, equipment_constants_1.isOnEquipment)(job.reading)) {
        report('reading', `${job.reading} is read on a connection: keep this job in nextPhase.work`);
    }
    if (job.doneWhen >= job.doWhen)
        report('doneWhen', `must be below doWhen (${job.doWhen})`);
};
exports.conditionJobRules = conditionJobRules;
const formRuleRules = (rule, report) => {
    if (rule.alert)
        (0, exports.alertRules)(rule.alert, (0, exports.under)(report, 'alert'));
    if (rule.schedule)
        (0, exports.scheduleRules)(rule.schedule, (0, exports.under)(report, 'schedule'));
    const parts = {
        when: orDefault(rule.when, { op: 'ANSWERED' }),
        factors: orDefault(rule.factors, []),
        everyBy: orDefault(rule.everyBy, []),
        partsBy: orDefault(rule.partsBy, []),
    };
    const nulls = ['when', 'factors', 'everyBy', 'partsBy'].filter((path) => parts[path] == null);
    nulls.forEach((path) => report(path, `${path} must be ${path === 'when' ? 'an object' : 'a list'}, not null`));
    const { when, factors, everyBy, partsBy } = parts;
    if (when == null || factors == null || everyBy == null || partsBy == null)
        return;
    const op = orDefault(when.op, 'ANSWERED');
    const value = when.value ?? null;
    const flags = when.flags ?? null;
    if ((0, equipment_constants_1.isKnownReading)(rule.reading) && !(0, equipment_constants_1.isOnEquipment)(rule.reading)) {
        report('reading', `${rule.reading} is read on a connection: keep this rule in nextPhase.work`);
    }
    if (rule.reads === 'LIMITS' && (!rule.reading || !rule.direction || !rule.key || !factors.length)) {
        report('factors', 'a LIMITS rule needs reading, direction, key and factors');
    }
    if ((rule.reads === 'FLAG' || rule.reads === 'EXPECTS') && !rule.field) {
        report('field', `a ${rule.reads} rule keeps a fact on the machine and needs a field`);
    }
    if (op !== 'ANSWERED' && op !== 'ON' && value == null) {
        report('when.value', `${op} needs a value to compare the answer with`);
    }
    if (op === 'MATCHES' && value != null) {
        const problem = patternProblem(value, flags);
        if (problem)
            report('when.value', problem);
    }
    everyBy.forEach((e, i) => {
        const problem = patternProblem(e.pattern, e.flags ?? null);
        if (problem)
            report(`everyBy.${i}.pattern`, problem);
    });
    partsBy.forEach((p, i) => {
        const problem = patternProblem(p.pattern, p.flags ?? null);
        if (problem)
            report(`partsBy.${i}.pattern`, problem);
    });
};
exports.formRuleRules = formRuleRules;
const typeRules = (type, report) => {
    const code = typeof type.code === 'string' ? type.code.trim() : type.code;
    const lists = {
        readings: orDefault(type.readings, []),
        alerts: orDefault(type.alerts, []),
        schedules: orDefault(type.schedules, []),
        conditionJobs: orDefault(type.conditionJobs, []),
        formRules: orDefault(type.formRules, []),
    };
    const phase = orDefault(type.nextPhase, {});
    const nulls = Object.keys(lists).filter((path) => lists[path] == null);
    nulls.forEach((path) => report(path, `${path} must be a list: send [] for none`));
    if (phase == null)
        report('nextPhase', 'nextPhase must be an object: send {} for none');
    const phaseLists = {
        readings: phase == null ? [] : orDefault(phase.readings, []),
        alerts: phase == null ? [] : orDefault(phase.alerts, []),
        work: phase == null ? [] : orDefault(phase.work, []),
    };
    const phaseNulls = Object.keys(phaseLists).filter((path) => phaseLists[path] == null);
    phaseNulls.forEach((path) => report(`nextPhase.${path}`, `nextPhase.${path} must be a list: send [] for none`));
    const { readings, alerts, schedules, conditionJobs, formRules } = lists;
    const nextPhaseReadings = phaseLists.readings;
    if (!readings || !alerts || !schedules || !conditionJobs || !formRules || !nextPhaseReadings || phase == null || phaseNulls.length)
        return;
    const own = new Set();
    readings.forEach((r, i) => {
        if ((0, equipment_constants_1.isKnownReading)(r.name) && !(0, equipment_constants_1.isOnEquipment)(r.name)) {
            report(`readings.${i}.name`, `${r.name} is read on a connection: list it in nextPhase.readings`);
        }
        if (own.has(r.name))
            report(`readings.${i}.name`, `${r.name} is listed twice`);
        own.add(r.name);
    });
    alerts.forEach((a, i) => {
        if ((0, equipment_constants_1.isKnownReading)(a.reading) && !own.has(a.reading) && (0, equipment_constants_1.isOnEquipment)(a.reading)) {
            report(`alerts.${i}.reading`, `${code} does not carry ${a.reading}`);
        }
        if (a.gate && !own.has(a.gate))
            report(`alerts.${i}.gate`, `${code} does not carry ${a.gate}`);
    });
    conditionJobs.forEach((j, i) => {
        if ((0, equipment_constants_1.isKnownReading)(j.reading) && !own.has(j.reading) && (0, equipment_constants_1.isOnEquipment)(j.reading)) {
            report(`conditionJobs.${i}.reading`, `${code} does not carry ${j.reading}`);
        }
    });
    formRules.forEach((r, i) => {
        if (r.reads === 'LIMITS' && r.reading && !own.has(r.reading)) {
            report(`formRules.${i}.reading`, `${code} does not carry ${r.reading}`);
        }
    });
    nextPhaseReadings.forEach((r, i) => {
        if (!(0, equipment_constants_1.isKnownReading)(r.name))
            return;
        const def = equipment_constants_1.READINGS[r.name];
        const waits = def.where === 'connection' || (def.inWater && !type.holdsWater && !own.has(r.name));
        if (!waits)
            report(`nextPhase.readings.${i}.name`, `${r.name} is read on this equipment, not next phase`);
    });
    const sameName = (list, path) => {
        const names = new Set();
        list.forEach((x, i) => {
            if (names.has(x.name))
                report(`${path}.${i}.name`, `${x.name} is used twice`);
            names.add(x.name);
        });
    };
    sameName(alerts, 'alerts');
    sameName(schedules, 'schedules');
    const formAlerts = formRules.flatMap((r) => (r.alert ? [r.alert] : []));
    const formSchedules = formRules.flatMap((r) => (r.schedule ? [r.schedule] : []));
    const dupe = (list, path) => {
        const keys = new Set();
        list.forEach((x) => {
            if (keys.has(x.key))
                report(path, `key ${x.key} is used twice`);
            keys.add(x.key);
        });
    };
    dupe([...alerts, ...formAlerts], 'alerts');
    dupe([...schedules, ...formSchedules], 'schedules');
    dupe(conditionJobs, 'conditionJobs');
    const adjustable = new Set([...schedules, ...conditionJobs].map((x) => x.key));
    formRules.forEach((r, i) => {
        if (r.adjust && !adjustable.has(r.adjust.itemKey)) {
            report(`formRules.${i}.adjust.itemKey`, `${code} has no schedule or condition job ${r.adjust.itemKey}`);
        }
    });
};
const eachItem = (list, path, rules, report, reported) => {
    if (reported(path))
        return;
    (list ?? []).forEach((item, i) => item && rules(item, (0, exports.under)(report, `${path}.${i}`)));
};
exports.eachItem = eachItem;
const nameRules = (type, report, reported) => {
    const names = (list, path, fields) => (0, exports.eachItem)(list, path, (item, at) => fields(item).forEach(([field, name]) => (0, exports.knownReading)(name, field, at)), report, reported);
    names(type.readings, 'readings', (r) => [['name', r.name]]);
    names(type.alerts, 'alerts', (a) => [
        ['reading', a.reading],
        ['gate', a.gate],
    ]);
    names(type.conditionJobs, 'conditionJobs', (j) => [['reading', j.reading]]);
    names(type.formRules, 'formRules', (r) => [
        ['reading', r.reading],
        ['alert.reading', r.alert?.reading],
        ['alert.gate', r.alert?.gate],
    ]);
    if (type.nextPhase && !reported('nextPhase')) {
        names(type.nextPhase.readings, 'nextPhase.readings', (r) => [['name', r.name]]);
        names(type.nextPhase.alerts, 'nextPhase.alerts', (a) => [['reading', a.reading]]);
        names(type.nextPhase.work, 'nextPhase.work', (w) => [['reading', w.reading]]);
    }
    entriesOf(type.tagMap).forEach(([tag, name]) => (0, exports.knownReading)(name, `tagMap.${tag}`, report));
};
const validateLibraryType = (type) => (0, exports.collectViolations)((report, reported) => {
    typeRules(type, report);
    (0, exports.eachItem)(type.alerts, 'alerts', exports.alertRules, report, reported);
    (0, exports.eachItem)(type.schedules, 'schedules', exports.scheduleRules, report, reported);
    (0, exports.eachItem)(type.conditionJobs, 'conditionJobs', exports.conditionJobRules, report, reported);
    (0, exports.eachItem)(type.formRules, 'formRules', exports.formRuleRules, report, reported);
    nameRules(type, report, reported);
});
exports.validateLibraryType = validateLibraryType;
