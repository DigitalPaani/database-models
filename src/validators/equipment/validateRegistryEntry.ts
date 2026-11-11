import { NON_EQUIPMENT_CODES } from '../../constants/equipment.constants';
import type { LibraryItemKind } from '../../constants/equipment.constants';
import type { EquipmentRegistryDoc, MachineOverride } from '../../models/equipmentRegistry.model';
import { bandsProblem, collectViolations, eachItem } from './validateLibraryType';
import type { Report, Violation } from './validateLibraryType';

/*
 * The rules behind EquipmentRegistry's validate hook, copied from node-backend's
 * src/components/equipment/domain/validateRegistryEntry.ts; the two must change together.
 */

export type RegistryEntryCandidate = { [K in keyof EquipmentRegistryDoc]?: EquipmentRegistryDoc[K] | null };

const OVERRIDE_FIELDS: Record<LibraryItemKind, readonly (keyof MachineOverride)[]> = {
  ALERT: ['direction', 'bands'],
  SCHEDULE: ['basis', 'every', 'meterHours', 'performedBy'],
  CONDITION_JOB: ['doWhen', 'doneWhen'],
};
const ALL_OVERRIDE_FIELDS = [...new Set(Object.values(OVERRIDE_FIELDS).flat())];
const isSet = (o: MachineOverride, f: keyof MachineOverride): boolean => (f === 'bands' ? o.bands !== undefined : o[f] != null);

export const typeCodeOf = (entry: { storedCode?: string | null; drawnCode?: string | null }): string => entry.storedCode || entry.drawnCode || '';

export const overrideRules = (o: MachineOverride, report: Report): void => {
  if (!Object.prototype.hasOwnProperty.call(OVERRIDE_FIELDS, o.kind)) return;
  const allowed = OVERRIDE_FIELDS[o.kind];
  ALL_OVERRIDE_FIELDS.filter((f) => !allowed.includes(f) && isSet(o, f)).forEach((f) => {
    report(f, `${o.kind} overrides cannot set ${f}`);
  });
  if (!o.off && !allowed.some((f) => isSet(o, f))) report('key', `override of ${o.key} changes nothing`);
  if (o.bands !== undefined) {
    if (!o.direction) report('direction', 'bands need a direction to be checked against');
    else {
      const problem = bandsProblem(o.bands, o.direction);
      if (problem) report('bands', problem);
    }
  }
  if (o.doWhen != null && o.doneWhen != null && o.doneWhen >= o.doWhen) {
    report('doneWhen', `must be below doWhen (${o.doWhen})`);
  }
};

const entryRules = (entry: RegistryEntryCandidate, report: Report): void => {
  const typeCode = typeCodeOf(entry);
  const overrides = entry.overrides ?? [];
  if (NON_EQUIPMENT_CODES.includes(typeCode)) {
    report('typeCode', `${typeCode} is drawn, not equipment: it has no place in the registry`);
  }
  if (entry.storedSource === 'explicit' && !entry.storedCode) {
    report('storedCode', 'an explicit stored type needs the code that was stored');
  }
  if (!entry.storedSource && entry.storedCode) {
    report('storedSource', 'say whether the stored type was chosen or is the shape default');
  }
  if (!entry.libraryTypeId) {
    if (entry.libraryVersion != null) report('libraryVersion', 'a machine not in the database inherits no version');
    if (entry.tierOverride) report('tierOverride', 'a machine not in the database has no library tier to override');
    if (overrides.length) report('overrides', 'a machine not in the database has no library items to override');
  }
  const seen = new Set<string>();
  overrides.forEach((o, i) => {
    const id = `${o.kind}:${o.key}`;
    if (seen.has(id)) report(`overrides.${i}.key`, `${id} is overridden twice`);
    seen.add(id);
  });
};

export const validateRegistryEntry = (entry: RegistryEntryCandidate): Violation[] =>
  collectViolations((report, reported) => {
    entryRules(entry, report);
    eachItem(entry.overrides, 'overrides', overrideRules, report, reported);
  });
