import type { Model, Types } from 'mongoose';
import type { PlantType } from '../constants/equipment.constants';
import type { LibrarySchedule } from './equipmentLibraryType.model';
export interface PlantMilestone {
    key: string;
    name: string;
}
export interface PlantTypeProfileDoc {
    _id: Types.ObjectId;
    code: PlantType;
    name: string;
    /** EquipmentLibraryType codes such a plant usually has. A guide for setup, never a source of machines. */
    usualTypeCodes: string[];
    rounds: LibrarySchedule[];
    milestones: PlantMilestone[];
    version: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const PlantTypeProfileModel: Model<PlantTypeProfileDoc>;
export { PlantTypeProfileModel };
//# sourceMappingURL=plantTypeProfile.model.d.ts.map