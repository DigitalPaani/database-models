import type { Direction } from '../../constants/equipment.constants';
import type { EquipmentLibraryTypeDoc, FormRule, LibraryAlert, LibraryConditionJob, LibrarySchedule, SeverityBand } from '../../models/equipmentLibraryType.model';
/** One reason a library type or registry entry was refused, at the path a form can put it next to. */
export interface Violation {
    path: string;
    code: string;
    message: string;
}
export type LibraryTypeCandidate = {
    [K in keyof EquipmentLibraryTypeDoc]?: EquipmentLibraryTypeDoc[K] | null;
};
export type Report = (path: string, message: string, code?: 'RULE' | 'ENUM') => void;
export declare const under: (report: Report, prefix: string) => Report;
export declare const collectViolations: (check: (report: Report, reported: (path: string) => boolean) => void) => Violation[];
export declare const knownReading: (name: unknown, path: string, report: Report) => void;
export declare function bandsProblem(bands: SeverityBand[], direction: Direction): string | null;
export declare function patternProblem(pattern: string, flags: string | null): string | null;
export declare const alertRules: (alert: LibraryAlert, report: Report) => void;
export declare const basisOf: (schedule: Pick<LibrarySchedule, "basis">) => LibrarySchedule["basis"];
export declare const scheduleRules: (schedule: LibrarySchedule, report: Report) => void;
export declare const conditionJobRules: (job: LibraryConditionJob, report: Report) => void;
export declare const formRuleRules: (rule: FormRule, report: Report) => void;
export declare const eachItem: <T>(list: T[] | null | undefined, path: string, rules: (item: T, report: Report) => void, report: Report, reported: (at: string) => boolean) => void;
export declare const validateLibraryType: (type: LibraryTypeCandidate) => Violation[];
//# sourceMappingURL=validateLibraryType.d.ts.map