import type { Document, Model, Types } from 'mongoose';
/**
 * A role template — the tick-pattern a role confers, as data.
 *
 * These were code constants. Moving them into Mongo is what makes an editor
 * possible, and it is also what re-opens the pre-mortem findings the constants
 * closed by construction: publish without validation (B2), no versioning and a
 * one-slot rollback (H7), concurrent edits clobbering each other (H8).
 *
 * So the guardrails live on this collection rather than in a screen:
 *   - `version` is a compare-and-swap token; a stale write is rejected (H8)
 *   - every publish writes a roleTemplateVersion row, so rollback is N-deep (H7)
 *   - `isSystem` protects the 5 seeded roles from deletion (§4's closed catalog)
 *   - the tick-set is validated before it is stored (B2)
 */
interface IRoleTemplate extends Document {
    roleKey: string;
    name: string;
    description: string;
    /** Stored already closed under the dependency ladder. */
    permissionKeys: string[];
    version: number;
    /** One of the 5 from §4 — editable, never deletable. */
    isSystem: boolean;
    /** Read-only for everyone; nothing but a migration should flip this. */
    isLocked: boolean;
    isArchived: boolean;
    createdBy: Types.ObjectId | null;
    updatedBy: Types.ObjectId | null;
}
declare const RoleTemplateModel: Model<IRoleTemplate>;
/**
 * One row per published version — the "what changed, by whom, why" record.
 *
 * The prototype kept a single snapshot, so a rollback was itself
 * unrecoverable (H7). This is append-only and keeps the computed diff, so the
 * version picker can show "+3 grants / −1 revoke" without recomputing it.
 */
interface IRoleTemplateVersion extends Document {
    roleKey: string;
    version: number;
    permissionKeys: string[];
    addedKeys: string[];
    removedKeys: string[];
    /** How many people held this role when it was published. */
    holdersAffected: number;
    reason: string;
    publishedBy: Types.ObjectId | null;
    publishedByLabel: string;
    /** Set when this version was produced by rolling back to an earlier one. */
    rolledBackFrom: number | null;
}
declare const RoleTemplateVersionModel: Model<IRoleTemplateVersion>;
export { IRoleTemplate, IRoleTemplateVersion, RoleTemplateModel, RoleTemplateVersionModel, };
//# sourceMappingURL=roleTemplate.model.d.ts.map