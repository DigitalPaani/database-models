import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

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

const permissionShadowLogSchema = new Schema<IPermissionShadowLog>(
  {
    route: { type: String, required: true },
    method: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', default: null },
    legacyTag: { type: String, default: null },
    permissionKey: { type: String, default: null },
    legacy: { type: String, enum: ['ALLOW', 'DENY', 'ERROR', 'UNMAPPED'], required: true },
    v2: { type: String, enum: ['ALLOW', 'DENY', 'ERROR', 'UNMAPPED'], required: true },
    agreed: { type: Boolean, required: true },
    divergenceReason: { type: String, default: null },
    legacyFailedOpen: { type: Boolean, default: false },
    v2Error: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Promotion query: "disagreements for this route in the last N days".
permissionShadowLogSchema.index({ route: 1, agreed: 1, createdAt: -1 });
permissionShadowLogSchema.index({ agreed: 1, createdAt: -1 });
permissionShadowLogSchema.index({ legacyFailedOpen: 1, route: 1 });
// Keep 45 days — long enough to prove a route is quiet, short enough to bound growth.
permissionShadowLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 45 * 24 * 60 * 60 });

const PermissionShadowLogModel: Model<IPermissionShadowLog> =
  mongoose.model<IPermissionShadowLog>(
    'PermissionShadowLog',
    permissionShadowLogSchema,
    'permissionShadowLogs'
  );

export { IPermissionShadowLog, ShadowVerdict, PermissionShadowLogModel };
