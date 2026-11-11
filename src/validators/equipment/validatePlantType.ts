import type { PlantTypeProfileDoc } from '../../models/plantTypeProfile.model';
import { basisOf, collectViolations, eachItem, scheduleRules } from './validateLibraryType';
import type { Report, Violation } from './validateLibraryType';

/*
 * The rules behind PlantTypeProfile's validate hook, copied from node-backend's
 * src/components/equipment/domain/validatePlantType.ts; the two must change together.
 */

export type PlantTypeCandidate = { [K in keyof PlantTypeProfileDoc]?: PlantTypeProfileDoc[K] | null };

const plantRules = (plantType: PlantTypeCandidate, report: Report): void => {
  if (plantType.rounds === null) report('rounds', 'rounds must be a list: send [] for none');
  (plantType.rounds ?? []).forEach((r, i) => {
    if (basisOf(r) !== 'CALENDAR') report(`rounds.${i}.basis`, 'a plant round runs on the calendar');
  });
};

export const validatePlantType = (plantType: PlantTypeCandidate): Violation[] =>
  collectViolations((report, reported) => {
    plantRules(plantType, report);
    eachItem(plantType.rounds, 'rounds', scheduleRules, report, reported);
  });
