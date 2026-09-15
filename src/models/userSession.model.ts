import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

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
export type RevokeReason =
  | 'USER_LOGOUT'
  | 'LOGOUT_ALL_DEVICES'
  | 'PERMISSIONS_REVOKED'
  | 'ROLE_CHANGED'
  | 'GRANT_CHANGED'
  | 'USER_DEACTIVATED'
  | 'PLANT_UNASSIGNED'
  | 'REFRESH_REUSE_DETECTED'
  | 'ADMIN_FORCED';

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

const userSessionSchema = new Schema<IUserSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    refreshTokenHash: { type: String, required: true },
    family: { type: String, required: true },
    userAgent: { type: String, default: null },
    ip: { type: String, default: null },
    impersonatedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    lastUsedAt: { type: Date, default: () => new Date() },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    revokedReason: { type: String, default: null },
  },
  { timestamps: true }
);

// Refresh lookup: the only hot query on this collection.
userSessionSchema.index({ refreshTokenHash: 1 }, { unique: true });
// "Kill every session for this user" — the revocation path.
userSessionSchema.index({ userId: 1, revokedAt: 1 });
// Reuse detection across a rotation chain.
userSessionSchema.index({ family: 1 });
// Let Mongo sweep dead rows; revoked rows still expire on their original clock.
userSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserSessionModel: Model<IUserSession> = mongoose.model<IUserSession>(
  'UserSession',
  userSessionSchema,
  'userSessions'
);

export { IUserSession, UserSessionModel };
