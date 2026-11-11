import type { EquipmentRegistryDoc, MachineOverride } from '../../models/equipmentRegistry.model';
import type { Report, Violation } from './validateLibraryType';
export type RegistryEntryCandidate = {
    [K in keyof EquipmentRegistryDoc]?: EquipmentRegistryDoc[K] | null;
};
export declare const typeCodeOf: (entry: {
    storedCode?: string | null;
    drawnCode?: string | null;
}) => string;
export declare const overrideRules: (o: MachineOverride, report: Report) => void;
export declare const validateRegistryEntry: (entry: RegistryEntryCandidate) => Violation[];
//# sourceMappingURL=validateRegistryEntry.d.ts.map