import type { Document, Model, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

// Kept in sync with node-backend src/constants/roleTemplates.ts (EXCEPTION_KEYS).
const EXCEPTION_KEYS = ['REMOTE_ACTUATION', 'VIEW_AS_USER', 'SENSOR_HEALTH'] as const;

/**
 * The 3 exception permissions (§10): remote actuation, view-as-another-user,
 * sensor-health. Granted one person + one plant + one reason at a time.
 *
 * Never a role tick, never an override, never a bulk action. They are not
 * leaves in the permission tree and must not be rendered as checkboxes.
 *
 * `expiresAt` is NOT in the write-up — proposed here because exception grants
 * that never expire become permanent by accident. Confirm with the PM; set
 * null to keep the documented behaviour.
 */
interface IExceptionPermissionGrant extends Document {
  userId: Types.ObjectId;
  plantId: Types.ObjectId;
  exceptionKey: string;
  reason: string;
  grantedBy: Types.ObjectId;
  expiresAt: Date | null;
  revokedAt: Date | null;
  revokedBy: Types.ObjectId | null;
}

const exceptionPermissionGrantSchema = new Schema<IExceptionPermissionGrant>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
    exceptionKey: { type: String, enum: [...EXCEPTION_KEYS], required: true },
    reason: {
      type: String,
      required: [true, 'A written reason is mandatory for every exception grant (§10)'],
      trim: true,
      minlength: [10, 'Exception grant reason must be meaningful — at least 10 characters'],
    },
    grantedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', required: true },
    expiresAt: { type: Date, default: null },
    revokedAt: { type: Date, default: null },
    revokedBy: { type: Schema.Types.ObjectId, ref: 'NewUser', default: null },
  },
  { timestamps: true }
);

// One live grant per (person, plant, exception).
exceptionPermissionGrantSchema.index(
  { userId: 1, plantId: 1, exceptionKey: 1 },
  { unique: true, partialFilterExpression: { revokedAt: null } }
);
exceptionPermissionGrantSchema.index({ userId: 1, revokedAt: 1 });
// The audit question: "who currently holds remote actuation, anywhere?"
exceptionPermissionGrantSchema.index({ exceptionKey: 1, revokedAt: 1 });

const ExceptionPermissionGrantModel: Model<IExceptionPermissionGrant> =
  mongoose.model<IExceptionPermissionGrant>(
    'ExceptionPermissionGrant',
    exceptionPermissionGrantSchema,
    'exceptionPermissionGrants'
  );

export { IExceptionPermissionGrant, ExceptionPermissionGrantModel };
