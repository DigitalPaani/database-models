import type { HydratedDocument, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import { PLANT_TYPES } from '../constants/equipment.constants';
import type { PlantType } from '../constants/equipment.constants';
import { validatePlantType } from '../validators/equipment/validatePlantType';
import { scheduleSchema } from './equipmentLibraryType.model';
import type { LibrarySchedule } from './equipmentLibraryType.model';

/*
 * The library's top level: what a plant of this type inherits as a whole. It gives rounds and milestones and nothing
 * else — no machine and no alert. A logbook round is typed by hand and reads no sensor.
 *
 * The same schema as node-backend's src/components/equipment/models/plantTypeProfile.model.ts, which owns this
 * collection. Change the two together.
 */

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

const plantTypeProfileSchema = new Schema<PlantTypeProfileDoc>(
  {
    code: { type: String, enum: [...PLANT_TYPES], required: true },
    name: { type: String, required: true },
    usualTypeCodes: { type: [String], default: [] },
    rounds: { type: [scheduleSchema], default: [] },
    milestones: {
      type: [new Schema<PlantMilestone>({ key: { type: String, required: true }, name: { type: String, required: true } }, { _id: false })],
      default: [],
    },
    version: { type: Number, required: true, default: 1, min: 1 },
  },
  { timestamps: true }
);

plantTypeProfileSchema.pre('validate', function (this: HydratedDocument<PlantTypeProfileDoc>) {
  validatePlantType(this).forEach((v) => this.invalidate(v.path, v.message));
});

plantTypeProfileSchema.index({ code: 1 }, { unique: true });

const PlantTypeProfileModel: Model<PlantTypeProfileDoc> = mongoose.model<PlantTypeProfileDoc>(
  'PlantTypeProfile',
  plantTypeProfileSchema,
  'plantTypeProfiles'
);

export { PlantTypeProfileModel };
