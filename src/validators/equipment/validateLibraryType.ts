import { SEVERITY_RANK } from '../../constants/closeTheLoop.constants';
import type { Severity } from '../../constants/closeTheLoop.constants';
import { READINGS, isKnownReading, isOnEquipment } from '../../constants/equipment.constants';
import type { Direction, ReadingName } from '../../constants/equipment.constants';
import type {
  EquipmentLibraryTypeDoc,
  FormAnswerMatch,
  FormRule,
  LibraryAlert,
  LibraryConditionJob,
  LibrarySchedule,
  NextPhase,
  SeverityBand,
} from '../../models/equipmentLibraryType.model';

/*
 * The rules behind EquipmentLibraryType's validate hook, copied from node-backend's
 * src/components/equipment/domain/validateLibraryType.ts. Without them a service writing through this package would
 * store types node-backend's copy refuses, so the two must change together.
 */

/** One reason a library type or registry entry was refused, at the path a form can put it next to. */
export interface Violation {
  path: string;
  code: string;
  message: string;
}

export type LibraryTypeCandidate = { [K in keyof EquipmentLibraryTypeDoc]?: EquipmentLibraryTypeDoc[K] | null };

export type Report = (path: string, message: string, code?: 'RULE' | 'ENUM') => void;

export const under =
  (report: Report, prefix: string): Report =>
  (path, message, code) =>
    report(`${prefix}.${path}`, message, code);

const orDefault = <T>(value: T | undefined, fallback: T): T => (value === undefined ? fallback : value);

export const collectViolations = (check: (report: Report, reported: (path: string) => boolean) => void): Violation[] => {
  const byPath = new Map<string, Violation>();
  check(
    (path, message, code = 'RULE') => {
      if (!byPath.has(path)) byPath.set(path, { path, code, message });
    },
    (path) => byPath.has(path)
  );
  return [...byPath.values()];
};

export const knownReading = (name: unknown, path: string, report: Report): void => {
  if (name != null && !isKnownReading(name)) report(path, `${String(name)} is not a reading the library knows`, 'ENUM');
};

const entriesOf = (map: unknown): [string, unknown][] => {
  if (map instanceof Map) return [...map.entries()];
  return map && typeof map === 'object' ? Object.entries(map) : [];
};

export function bandsProblem(bands: SeverityBand[], direction: Direction): string | null {
  const seen = new Set<Severity>();
  for (const b of bands) {
    if (seen.has(b.severity)) return `${b.severity} appears twice`;
    seen.add(b.severity);
  }
  const ordered = [...bands].sort((a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity]);
  for (let i = 1; i < ordered.length; i++) {
    const worse = ordered[i].threshold;
    const milder = ordered[i - 1].threshold;
    if (direction === 'ABOVE' ? worse <= milder : worse >= milder) {
      return `${ordered[i].severity} at ${worse} must be ${direction === 'ABOVE' ? 'above' : 'below'} ${ordered[i - 1].severity} at ${milder}`;
    }
  }
  return null;
}

export function patternProblem(pattern: string, flags: string | null): string | null {
  try {
    new RegExp(pattern, flags ?? '');
    return null;
  } catch (error) {
    return `/${pattern}/${flags ?? ''} is not a valid pattern: ${(error as Error).message}`;
  }
}

export const alertRules = (alert: LibraryAlert, report: Report): void => {
  const bands = orDefault<SeverityBand[] | null>(alert.bands, []);
  if (bands == null) {
    report('bands', 'bands must be a list: an alert needs at least one band');
    return;
  }
  if (!isKnownReading(alert.reading)) return;
  if (!isOnEquipment(alert.reading)) {
    report('reading', `${alert.reading} is read on a connection: keep this alert in nextPhase.alerts`);
  }
  if (alert.gate && isKnownReading(alert.gate) && READINGS[alert.gate].kind !== 'STATUS') {
    report('gate', `the gate must be an on/off reading, not ${alert.gate}`);
  }
  const kind = READINGS[alert.reading].kind;
  if (kind === 'METER') report('reading', `${alert.reading} only climbs: schedule on it instead of alerting`);
  if (!bands.length) report('bands', 'an alert needs at least one band');
  if (kind === 'STATUS') {
    const [band] = bands;
    if (bands.length !== 1 || band.threshold !== 1 || alert.direction !== 'ABOVE') {
      report('bands', `${alert.reading} is on/off: one band at threshold 1, direction ABOVE`);
    }
    return;
  }
  const problem = bandsProblem(bands, alert.direction);
  if (problem) report('bands', problem);
};

export const basisOf = (schedule: Pick<LibrarySchedule, 'basis'>): LibrarySchedule['basis'] => orDefault(schedule.basis, 'CALENDAR');

export const scheduleRules = (schedule: LibrarySchedule, report: Report): void => {
  const basis = basisOf(schedule);
  if (basis !== 'METER' && !schedule.every) report('every', `a ${basis} schedule needs a calendar cadence`);
  if (basis !== 'CALENDAR' && schedule.meterHours == null) report('meterHours', `a ${basis} schedule needs run-hours`);
};

export const conditionJobRules = (job: LibraryConditionJob, report: Report): void => {
  if (isKnownReading(job.reading) && !isOnEquipment(job.reading)) {
    report('reading', `${job.reading} is read on a connection: keep this job in nextPhase.work`);
  }
  if (job.doneWhen >= job.doWhen) report('doneWhen', `must be below doWhen (${job.doWhen})`);
};

export const formRuleRules = (rule: FormRule, report: Report): void => {
  if (rule.alert) alertRules(rule.alert, under(report, 'alert'));
  if (rule.schedule) scheduleRules(rule.schedule, under(report, 'schedule'));

  const parts = {
    when: orDefault<Partial<FormAnswerMatch> | null>(rule.when, { op: 'ANSWERED' }),
    factors: orDefault<FormRule['factors'] | null>(rule.factors, []),
    everyBy: orDefault<FormRule['everyBy'] | null>(rule.everyBy, []),
    partsBy: orDefault<FormRule['partsBy'] | null>(rule.partsBy, []),
  };
  const nulls = (['when', 'factors', 'everyBy', 'partsBy'] as const).filter((path) => parts[path] == null);
  nulls.forEach((path) => report(path, `${path} must be ${path === 'when' ? 'an object' : 'a list'}, not null`));
  const { when, factors, everyBy, partsBy } = parts;
  if (when == null || factors == null || everyBy == null || partsBy == null) return;
  const op = orDefault(when.op, 'ANSWERED');
  const value = when.value ?? null;
  const flags = when.flags ?? null;
  if (isKnownReading(rule.reading) && !isOnEquipment(rule.reading)) {
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
    if (problem) report('when.value', problem);
  }
  everyBy.forEach((e, i) => {
    const problem = patternProblem(e.pattern, e.flags ?? null);
    if (problem) report(`everyBy.${i}.pattern`, problem);
  });
  partsBy.forEach((p, i) => {
    const problem = patternProblem(p.pattern, p.flags ?? null);
    if (problem) report(`partsBy.${i}.pattern`, problem);
  });
};

const typeRules = (type: LibraryTypeCandidate, report: Report): void => {
  const code = typeof type.code === 'string' ? type.code.trim() : type.code;
  const lists = {
    readings: orDefault(type.readings, []),
    alerts: orDefault(type.alerts, []),
    schedules: orDefault(type.schedules, []),
    conditionJobs: orDefault(type.conditionJobs, []),
    formRules: orDefault(type.formRules, []),
  };
  const phase = orDefault<Partial<NextPhase> | null>(type.nextPhase, {});
  const nulls = (Object.keys(lists) as (keyof typeof lists)[]).filter((path) => lists[path] == null);
  nulls.forEach((path) => report(path, `${path} must be a list: send [] for none`));
  if (phase == null) report('nextPhase', 'nextPhase must be an object: send {} for none');
  const phaseLists = {
    readings: phase == null ? [] : orDefault<NextPhase['readings'] | null>(phase.readings, []),
    alerts: phase == null ? [] : orDefault<NextPhase['alerts'] | null>(phase.alerts, []),
    work: phase == null ? [] : orDefault<NextPhase['work'] | null>(phase.work, []),
  };
  const phaseNulls = (Object.keys(phaseLists) as (keyof typeof phaseLists)[]).filter((path) => phaseLists[path] == null);
  phaseNulls.forEach((path) => report(`nextPhase.${path}`, `nextPhase.${path} must be a list: send [] for none`));
  const { readings, alerts, schedules, conditionJobs, formRules } = lists;
  const nextPhaseReadings = phaseLists.readings;
  if (!readings || !alerts || !schedules || !conditionJobs || !formRules || !nextPhaseReadings || phase == null || phaseNulls.length) return;

  const own = new Set<ReadingName>();
  readings.forEach((r, i) => {
    if (isKnownReading(r.name) && !isOnEquipment(r.name)) {
      report(`readings.${i}.name`, `${r.name} is read on a connection: list it in nextPhase.readings`);
    }
    if (own.has(r.name)) report(`readings.${i}.name`, `${r.name} is listed twice`);
    own.add(r.name);
  });
  alerts.forEach((a, i) => {
    if (isKnownReading(a.reading) && !own.has(a.reading) && isOnEquipment(a.reading)) {
      report(`alerts.${i}.reading`, `${code} does not carry ${a.reading}`);
    }
    if (a.gate && !own.has(a.gate)) report(`alerts.${i}.gate`, `${code} does not carry ${a.gate}`);
  });
  conditionJobs.forEach((j, i) => {
    if (isKnownReading(j.reading) && !own.has(j.reading) && isOnEquipment(j.reading)) {
      report(`conditionJobs.${i}.reading`, `${code} does not carry ${j.reading}`);
    }
  });
  formRules.forEach((r, i) => {
    if (r.reads === 'LIMITS' && r.reading && !own.has(r.reading)) {
      report(`formRules.${i}.reading`, `${code} does not carry ${r.reading}`);
    }
  });
  nextPhaseReadings.forEach((r, i) => {
    if (!isKnownReading(r.name)) return;
    const def = READINGS[r.name];
    const waits = def.where === 'connection' || (def.inWater && !type.holdsWater && !own.has(r.name));
    if (!waits) report(`nextPhase.readings.${i}.name`, `${r.name} is read on this equipment, not next phase`);
  });

  const sameName = (list: { name: string }[], path: string): void => {
    const names = new Set<string>();
    list.forEach((x, i) => {
      if (names.has(x.name)) report(`${path}.${i}.name`, `${x.name} is used twice`);
      names.add(x.name);
    });
  };
  sameName(alerts, 'alerts');
  sameName(schedules, 'schedules');

  const formAlerts = formRules.flatMap((r) => (r.alert ? [r.alert] : []));
  const formSchedules = formRules.flatMap((r) => (r.schedule ? [r.schedule] : []));
  const dupe = (list: { key: string }[], path: string): void => {
    const keys = new Set<string>();
    list.forEach((x) => {
      if (keys.has(x.key)) report(path, `key ${x.key} is used twice`);
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

export const eachItem = <T>(
  list: T[] | null | undefined,
  path: string,
  rules: (item: T, report: Report) => void,
  report: Report,
  reported: (at: string) => boolean
): void => {
  if (reported(path)) return;
  (list ?? []).forEach((item, i) => item && rules(item, under(report, `${path}.${i}`)));
};

const nameRules = (type: LibraryTypeCandidate, report: Report, reported: (at: string) => boolean): void => {
  const names = <T>(list: T[] | null | undefined, path: string, fields: (item: T) => [string, unknown][]): void =>
    eachItem(list, path, (item, at) => fields(item).forEach(([field, name]) => knownReading(name, field, at)), report, reported);
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
  entriesOf(type.tagMap).forEach(([tag, name]) => knownReading(name, `tagMap.${tag}`, report));
};

export const validateLibraryType = (type: LibraryTypeCandidate): Violation[] =>
  collectViolations((report, reported) => {
    typeRules(type, report);
    eachItem(type.alerts, 'alerts', alertRules, report, reported);
    eachItem(type.schedules, 'schedules', scheduleRules, report, reported);
    eachItem(type.conditionJobs, 'conditionJobs', conditionJobRules, report, reported);
    eachItem(type.formRules, 'formRules', formRuleRules, report, reported);
    nameRules(type, report, reported);
  });
