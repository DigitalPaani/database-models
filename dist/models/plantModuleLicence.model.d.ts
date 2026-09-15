import type { Document, Model, Types } from 'mongoose';
/**
 * Check 1 of the two-gate model: does this plant licence this module (§7).
 *
 * Plant licence takes precedence over everything a user holds — an unlicensed
 * module denies regardless of role, override, or admin grant. Rows are never
 * deleted; `licensed: false` means "dimmed", and flipping it back to true
 * restores access with no migration.
 *
 * NOTE: this is NOT plantsFeatureAuth (plantFeatureAuth.model.ts). That
 * collection tracks AI feature credits (gptModel, creditsAvailable) and is
 * unrelated to the permission licence gate.
 *
 * Seed `ops: { licensed: false }` at every plant so the whole Issue Resolution
 * permission set can ship dark and light up per plant on the day it is
 * licensed there.
 */
interface IPlantModuleLicence extends Document {
    plantId: Types.ObjectId;
    moduleKey: string;
    licensed: boolean;
    licensedAt: Date | null;
    updatedBy: Types.ObjectId | null;
}
declare const PlantModuleLicenceModel: Model<IPlantModuleLicence>;
export { IPlantModuleLicence, PlantModuleLicenceModel };
//# sourceMappingURL=plantModuleLicence.model.d.ts.map