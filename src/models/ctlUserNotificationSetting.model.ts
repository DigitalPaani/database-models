import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  DELIVERY_MODES,
  QuietWindow,
  REALTIME_CHANNELS,
  RealtimeChannel,
  SeverityModes,
} from "../constants/closeTheLoop.constants";

export interface CtlUserNotificationSettingDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  roleKey: string;
  modes: SeverityModes;
  quietHours: QuietWindow | null;
  quietHoursEnabled: boolean;
  realtimeChannel: RealtimeChannel;
  /** The Lead's one toggle: tell me when an issue is handed round without being started. */
  handoffAlerts: boolean;
  /** When the one-time "allow notifications" ask (A4) was shown. Server time. */
  pushPromptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const modeField = {
  type: String,
  enum: [...DELIVERY_MODES],
  required: true,
} as const;

const modesSchema = new Schema<SeverityModes>(
  {
    EMERGENCY: modeField,
    MAJOR: modeField,
    MINOR: modeField,
    CAUTION: modeField,
  },
  { _id: false },
);

export const quietWindowSchema = new Schema<QuietWindow>(
  {
    startMinute: { type: Number, required: true, min: 0, max: 1439 },
    endMinute: { type: Number, required: true, min: 0, max: 1439 },
  },
  { _id: false },
);

const ctlUserNotificationSettingSchema =
  new Schema<CtlUserNotificationSettingDoc>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
      roleKey: { type: String, required: true },
      modes: { type: modesSchema, required: true },
      quietHours: { type: quietWindowSchema, default: null },
      quietHoursEnabled: { type: Boolean, required: true, default: true },
      realtimeChannel: {
        type: String,
        enum: [...REALTIME_CHANNELS],
        required: true,
        default: "WHATSAPP",
      },
      handoffAlerts: { type: Boolean, required: true, default: true },
      pushPromptedAt: { type: Date, default: null },
    },
    { timestamps: true },
  );

ctlUserNotificationSettingSchema.index({ userId: 1 }, { unique: true });

const CtlUserNotificationSettingModel: Model<CtlUserNotificationSettingDoc> =
  mongoose.model<CtlUserNotificationSettingDoc>(
    "CtlUserNotificationSetting",
    ctlUserNotificationSettingSchema,
    "ctlUserNotificationSettings",
  );

export default CtlUserNotificationSettingModel;