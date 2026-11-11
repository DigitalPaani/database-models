import type { Model, Types } from 'mongoose';
import type { CriticalityTier, Direction, DueBasis, LibraryItemKind, PerformedBy } from '../constants/equipment.constants';
import type { Cadence, SeverityBand } from './equipmentLibraryType.model';
/**
 * explicit: the cell stores a type that is not its shape's default, so someone chose it.
 * shape-default: the cell stores the default its frontend shape class writes (every Diffuser Tank stores OS_TANK).
 *   storedCode keeps it when the apply honours shape defaults, and is null when it does not, so typeCode falls back
 *   to the drawn code. Kept either way, so a preview can say which rule decided the type.
 */
export declare const STORED_SOURCES: readonly ["explicit", "shape-default"];
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
declare const EquipmentRegistryModel: Model<EquipmentRegistryDoc>;
export { EquipmentRegistryModel };
//# sourceMappingURL=equipmentRegistry.model.d.ts.map