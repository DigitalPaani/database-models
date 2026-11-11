import type { Model, Types } from 'mongoose';
/**
 * One row per change to a library type: what it became, who changed it, why, and what moved.
 *
 * Append-only, as roleTemplateVersions: a correction is a new version, never an edit, so the history a reviewer
 * reads is the history that happened. `snapshot` is the whole content at that version, which is what lets a
 * machine's `libraryVersion` be explained and a bad edit be undone by publishing an old snapshot again.
 *
 * The same schema as node-backend's src/components/equipment/models/equipmentLibraryTypeVersion.model.ts, which
 * owns this collection. Change the two together.
 */
export declare const LIBRARY_VERSION_ACTIONS: readonly ["CREATE", "UPDATE", "ARCHIVE", "RESTORE"];
export type LibraryVersionAction = (typeof LIBRARY_VERSION_ACTIONS)[number];
export interface LibraryVersionSummary {
    /** Items by path, e.g. 'alerts.motor_current_high', 'readings.Motor current'. */
    added: string[];
    removed: string[];
    /** Items present on both sides that differ, and top-level fields that changed ('tier', 'formRules'). */
    changed: string[];
    /** The "to confirm" line was cleared: the owner accepted the reasoned guess. */
    confirmed: boolean;
}
export interface EquipmentLibraryTypeVersionDoc {
    _id: Types.ObjectId;
    code: string;
    version: number;
    action: LibraryVersionAction;
    snapshot: Record<string, unknown>;
    changedBy: Types.ObjectId | null;
    changedByLabel: string;
    reason: string;
    summary: LibraryVersionSummary;
    createdAt: Date;
}
declare const EquipmentLibraryTypeVersionModel: Model<EquipmentLibraryTypeVersionDoc>;
export { EquipmentLibraryTypeVersionModel };
//# sourceMappingURL=equipmentLibraryTypeVersion.model.d.ts.map