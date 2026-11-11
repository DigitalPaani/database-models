import type { PlantTypeProfileDoc } from '../../models/plantTypeProfile.model';
import type { Violation } from './validateLibraryType';
export type PlantTypeCandidate = {
    [K in keyof PlantTypeProfileDoc]?: PlantTypeProfileDoc[K] | null;
};
export declare const validatePlantType: (plantType: PlantTypeCandidate) => Violation[];
//# sourceMappingURL=validatePlantType.d.ts.map