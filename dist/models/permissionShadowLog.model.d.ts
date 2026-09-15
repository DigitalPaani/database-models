import type { Document, Model, Types } from 'mongoose';
/**
 * Stage-A shadow record: what the legacy engine decided vs what authorizeV2
 * would have decided, for the same request. Written AFTER the response is sent,
 * so it can never affect latency or outcome.
 *
 * A route is promoted from shadow to enforcing only when its disagreement
 * count has been zero at real traffic for N days — not on a calendar.
 */
type ShadowVerdict = 'ALLOW' | 'DENY' | 'ERROR' | 'UNMAPPED';
interface IPermissionShadowLog extends Document {
    route: string;
    method: string;
    userId: Types.ObjectId | null;
    plantId: Types.ObjectId | null;
    legacyTag: string | null;
    permissionKey: string | null;
    legacy: ShadowVerdict;
    v2: ShadowVerdict;
    agreed: boolean;
    /** Why they differed, when we can name it. */
    divergenceReason: string | null;
    /** Legacy fails open on unknown routes; v2 fails closed. Flags that case. */
    legacyFailedOpen: boolean;
    v2Error: string | null;
    createdAt: Date;
}
declare const PermissionShadowLogModel: Model<IPermissionShadowLog>;
export { IPermissionShadowLog, ShadowVerdict, PermissionShadowLogModel };
//# sourceMappingURL=permissionShadowLog.model.d.ts.map