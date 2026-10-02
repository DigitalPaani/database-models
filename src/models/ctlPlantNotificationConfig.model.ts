import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_QUIET_HOURS,
  HOOTER_DEFAULT_DURATION_SEC,
  HOOTER_DURATIONS,
  LANGUAGES,
  QuietWindow
} from "../constants/closeTheLoop.constants";
import { quietWindowSchema } from "./ctlUserNotificationSetting.model";

export interface CtlPlantNotificationConfigDoc {
  _id: Types.ObjectId;
  plantId: Types.ObjectId;
  hooterEnabled: boolean;
  hooterDurationSec: number;
  quietHours: QuietWindow;
  /** BE-31: whether people with no window of their own follow the site's. */
  quietHoursEnabled: boolean;
  /** BE-35: languages the site's people may pick, and the one anyone who has not picked hears. */
  languages: string[];
  defaultLanguage: string;
  updatedBy: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const ctlPlantNotificationConfigSchema =
  new Schema<CtlPlantNotificationConfigDoc>(
    {
      plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
      hooterEnabled: { type: Boolean, required: true, default: false },
      hooterDurationSec: {
        type: Number,
        required: true,
        default: HOOTER_DEFAULT_DURATION_SEC,
        min: HOOTER_DURATIONS.minSec,
        max: HOOTER_DURATIONS.maxSec,
      },
      quietHours: {
        type: quietWindowSchema,
        required: true,
        default: (): QuietWindow => ({ ...DEFAULT_QUIET_HOURS }),
      },
      quietHoursEnabled: { type: Boolean, required: true, default: true },
      // Every language until the admin narrows the list (offeredLanguages), so a plant
      // that only saved its hooter never moves its people to English.
      languages: {
        type: [String],
        enum: [...LANGUAGES],
        required: true,
        default: (): string[] => [...LANGUAGES],
      },
      defaultLanguage: {
        type: String,
        enum: [...LANGUAGES],
        required: true,
        default: DEFAULT_LANGUAGE,
      },
      updatedBy: { type: Schema.Types.ObjectId, ref: "NewUser", default: null },
    },
    { timestamps: true },
  );

ctlPlantNotificationConfigSchema.index({ plantId: 1 }, { unique: true });

const CtlPlantNotificationConfigModel: Model<CtlPlantNotificationConfigDoc> =
  mongoose.model<CtlPlantNotificationConfigDoc>(
    "CtlPlantNotificationConfig",
    ctlPlantNotificationConfigSchema,
    "ctlPlantNotificationConfigs",
  );

export default CtlPlantNotificationConfigModel;
