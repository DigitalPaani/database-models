import type { HydratedDocument, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import { CRITICALITY_TIERS, DIRECTIONS, DUE_BASES, LIBRARY_ITEM_KINDS, PERFORMED_BY } from '../constants/equipment.constants';
import type { CriticalityTier, Direction, DueBasis, LibraryItemKind, PerformedBy } from '../constants/equipment.constants';
import { typeCodeOf, validateRegistryEntry } from '../validators/equipment/validateRegistryEntry';
import { cadenceSchema, severityBandSchema } from './equipmentLibraryType.model';
import type { Cadence, SeverityBand } from './equipmentLibraryType.model';

/*
 * The equipment registry: one document per machine, a SCADA node that is equipment, at a plant. It holds who the
 * machine is, which library type it is, what SCADA said about it at the last apply, and its deltas against the
 * library. It does not copy the library's alerts, schedules or limits: only `overrides` stay the plant's own.
 *
 * Detection is one rule: typeCode = storedCode ?? drawnCode. Nothing is guessed from a label, and a form answer
 * never changes a type.
 *
 * Name clash to watch: LayoutEquipments.equipmentType is a coarse bucket (TANK, PUMP, VALVE …) from
 * TypeOfEquipment(). The type stored on a drawing cell is also called equipmentType there, but it is a palette code
 * ('OS_TANK' on a cell drawn as OS_TANK_DF), and it lives only in Layouts.layout.cells[]. `storedCode` is the second
 * one, never the first.
 *
 * The same schema as node-backend's src/components/equipment/models/equipmentRegistry.model.ts, which owns this
 * collection. Change the two together.
 */

/**
 * explicit: the cell stores a type that is not its shape's default, so someone chose it.
 * shape-default: the cell stores the default its frontend shape class writes (every Diffuser Tank stores OS_TANK).
 *   storedCode keeps it when the apply honours shape defaults, and is null when it does not, so typeCode falls back
 *   to the drawn code. Kept either way, so a preview can say which rule decided the type.
 */
export const STORED_SOURCES = ['explicit', 'shape-default'] as const;
export type StoredSource = (typeof STORED_SOURCES)[number];

export interface TierOverride {
  tier: CriticalityTier;
  /** Required: a tier that differs from the library with no reason is indistinguishable from a mistake. */
  reason: string;
  by: Types.ObjectId;
  at: Date;
}

/**
 * One library item changed on this machine. Anything not listed here follows the library. Fields are per kind:
 * ALERT may set direction and bands; SCHEDULE basis, every, meterHours and performedBy; CONDITION_JOB doWhen and doneWhen.
 */
export interface MachineOverride {
  kind: LibraryItemKind;
  /** The item's key on the library type. */
  key: string;
  /** Switched off on this machine. */
  off: boolean;
  direction: Direction | null;
  bands?: SeverityBand[];
  basis: DueBasis | null;
  every: Cadence | null;
  meterHours: number | null;
  performedBy: PerformedBy | null;
  doWhen: number | null;
  doneWhen: number | null;
  reason: string;
  by: Types.ObjectId;
  at: Date;
}

export interface MaintenanceMode {
  reason: string;
  plannedHours: number;
  note: string;
  since: Date;
  by: Types.ObjectId;
  /** Library alert keys paused while it is down. Kept so bringing it back online restores exactly these. */
  suppressedAlertKeys: string[];
}

export interface EquipmentRegistryDoc {
  _id: Types.ObjectId;
  plantId: Types.ObjectId;
  /** The drawing cell's equipmentId: LayoutEquipments._id, which is also what sensors.equipmentId holds. */
  layoutEquipmentId: Types.ObjectId;
  layoutCellId: string | null;
  /** Copied at apply from the Name answer, so lists need no second query. SCADA's answer is the truth. */
  name: string;
  /** Made from the label when the drawing has none: Reactor Feed Pump - 1 → RFP-1. */
  tag: string;
  /** The palette code the node was drawn with: the drawing cell's type. */
  drawnCode: string;
  /** The type stored on the node, when there is one. It wins over the drawn code. */
  storedCode: string | null;
  storedSource: StoredSource | null;
  /** LayoutEquipments.nodeType as the apply found it. Reported, never used: /changeNodeType moves it on its own. */
  recordNodeType: string | null;
  /** Set by the validate hook from storedCode ?? drawnCode, so it cannot drift from the rule. validateSync() skips the hook. */
  typeCode: string;
  /** null: the code is not in the database. The machine is kept and shown, and inherits nothing. */
  libraryTypeId: Types.ObjectId | null;
  /** The library type's version this machine last inherited; behind the type's own version means stale. */
  libraryVersion: number | null;
  tierOverride: TierOverride | null;
  derived: Map<string, number>;
  /** Facts the form rules keep: vfd, remote, overflow (true) and pumpType, valveType (the answer, lower-cased). */
  flags: Map<string, string | boolean>;
  overrides: MachineOverride[];
  maintenance: MaintenanceMode | null;
  lastSyncedAt: Date | null;
  /** The node was removed from the drawing. Kept, so history on the machine still resolves. */
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tierOverrideSchema = new Schema<TierOverride>(
  {
    tier: { type: String, enum: [...CRITICALITY_TIERS], required: true },
    reason: { type: String, required: true, trim: true },
    by: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    at: { type: Date, required: true },
  },
  { _id: false }
);

const overrideSchema = new Schema<MachineOverride>(
  {
    kind: { type: String, enum: [...LIBRARY_ITEM_KINDS], required: true },
    key: { type: String, required: true },
    off: { type: Boolean, default: false },
    direction: { type: String, enum: [...DIRECTIONS, null], default: null },
    // Absent, not empty, when the override leaves the bands alone: [] would read as "no bands".
    bands: { type: [severityBandSchema], default: undefined },
    basis: { type: String, enum: [...DUE_BASES, null], default: null },
    every: { type: cadenceSchema, default: null },
    meterHours: { type: Number, default: null, min: 1 },
    performedBy: { type: String, enum: [...PERFORMED_BY, null], default: null },
    doWhen: { type: Number, default: null },
    doneWhen: { type: Number, default: null },
    reason: { type: String, required: true, trim: true },
    by: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    at: { type: Date, required: true },
  },
  { _id: false }
);

const maintenanceSchema = new Schema<MaintenanceMode>(
  {
    reason: { type: String, required: true, trim: true },
    plannedHours: { type: Number, required: true, min: 0 },
    note: { type: String, default: '' },
    since: { type: Date, required: true },
    by: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    suppressedAlertKeys: { type: [String], default: [] },
  },
  { _id: false }
);

const equipmentRegistrySchema = new Schema<EquipmentRegistryDoc>(
  {
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    // No ref, to match node-backend's copy, where LayoutEquipments lives on another mongoose. Here it can be
    // populated by passing the model: populate({ path: 'layoutEquipmentId', model: LayoutEquipmentModel }).
    layoutEquipmentId: { type: Schema.Types.ObjectId, required: true },
    layoutCellId: { type: String, default: null },
    name: { type: String, default: '' },
    tag: { type: String, required: true, trim: true },
    drawnCode: { type: String, required: true },
    storedCode: { type: String, default: null },
    storedSource: { type: String, enum: [...STORED_SOURCES, null], default: null },
    recordNodeType: { type: String, default: null },
    typeCode: { type: String, required: true },
    libraryTypeId: { type: Schema.Types.ObjectId, ref: 'EquipmentLibraryType', default: null },
    libraryVersion: { type: Number, default: null },
    tierOverride: { type: tierOverrideSchema, default: null },
    derived: { type: Map, of: Number, default: {} },
    flags: { type: Map, of: Schema.Types.Mixed, default: {} },
    overrides: { type: [overrideSchema], default: [] },
    maintenance: { type: maintenanceSchema, default: null },
    lastSyncedAt: { type: Date, default: null },
    isArchived: { type: Boolean, default: false },
  },
  // Two admins on one machine's card: the second save sees the first's __v moved and fails, rather than writing its
  // stale overrides array over the first's. The apply's bulkWrite leaves __v alone and never touches those fields.
  { timestamps: true, optimisticConcurrency: true }
);

equipmentRegistrySchema.pre('validate', function (this: HydratedDocument<EquipmentRegistryDoc>) {
  this.typeCode = typeCodeOf(this);
  validateRegistryEntry(this).forEach((v) => this.invalidate(v.path, v.message));
});

equipmentRegistrySchema.index({ layoutEquipmentId: 1 }, { unique: true });
equipmentRegistrySchema.index({ plantId: 1, tag: 1 }, { unique: true, partialFilterExpression: { isArchived: false } });
// "Where the library lands": every machine of a type, across the estate.
equipmentRegistrySchema.index({ typeCode: 1, plantId: 1 });
// Machines behind their library type's version.
equipmentRegistrySchema.index({ libraryTypeId: 1, libraryVersion: 1 });

const EquipmentRegistryModel: Model<EquipmentRegistryDoc> = mongoose.model<EquipmentRegistryDoc>(
  'EquipmentRegistry',
  equipmentRegistrySchema,
  'equipmentRegistry'
);

export { EquipmentRegistryModel };
