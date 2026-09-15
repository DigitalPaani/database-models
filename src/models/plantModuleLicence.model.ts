import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

// Kept in sync with node-backend src/constants/permissionTree.ts (MODULES).
const MODULES = ['ops', 'data', 'tasks', 'dash', 'iot', 'inv', 'alerts', 'core'] as const;

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

const plantModuleLicenceSchema = new Schema<IPlantModuleLicence>(
  {
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    moduleKey: { type: String, enum: [...MODULES], required: true },
    licensed: { type: Boolean, required: true, default: false },
    licensedAt: { type: Date, default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
  },
  { timestamps: true }
);

plantModuleLicenceSchema.index({ plantId: 1, moduleKey: 1 }, { unique: true });
// Hot path: all licensed modules for a plant, cached and shared across users.
plantModuleLicenceSchema.index({ plantId: 1, licensed: 1 });

const PlantModuleLicenceModel: Model<IPlantModuleLicence> = mongoose.model<IPlantModuleLicence>(
  'PlantModuleLicence',
  plantModuleLicenceSchema,
  'plantModuleLicences'
);

export { IPlantModuleLicence, PlantModuleLicenceModel };
