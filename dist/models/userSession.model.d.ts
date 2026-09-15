import type { Document, Model, Types } from 'mongoose';
/**
 * One row per live login. This is the piece the current system has no equivalent
 * of — today a token is valid for 180 days and there is no logout endpoint
 * anywhere, so a session cannot be ended at all.
 *
 * The access token stays stateless (verified with no IO). Everything that needs
 * to *end* a session lives here:
 *   - revokedAt  blocks the next refresh (permanent)
 *   - a short-lived Redis key blocks the still-valid access token (<= its TTL)
 *
 * Refresh tokens are stored as a SHA-256 hash, never in the clear, and are
 * rotated on every use so a stolen refresh token is single-use.
 */
export type RevokeReason = 'USER_LOGOUT' | 'LOGOUT_ALL_DEVICES' | 'PERMISSIONS_REVOKED' | 'ROLE_CHANGED' | 'GRANT_CHANGED' | 'USER_DEACTIVATED' | 'PLANT_UNASSIGNED' | 'REFRESH_REUSE_DETECTED' | 'ADMIN_FORCED';
interface IUserSession extends Document {
    userId: Types.ObjectId;
    refreshTokenHash: string;
    /** Rotation chain id — survives rotation so "one login" stays one row. */
    family: string;
    userAgent: string | null;
    ip: string | null;
    /** viewAsUser impersonation sessions are marked so they can be culled wholesale. */
    impersonatedBy: Types.ObjectId | null;
    lastUsedAt: Date;
    expiresAt: Date;
    revokedAt: Date | null;
    revokedReason: RevokeReason | null;
}
declare const UserSessionModel: Model<IUserSession>;
export { IUserSession, UserSessionModel };
//# sourceMappingURL=userSession.model.d.ts.map