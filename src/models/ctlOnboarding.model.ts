import type { Model, Types } from "mongoose";
import mongoose, { Schema } from "mongoose";

export const ONBOARDING_OUTCOMES = ["COMPLETED", "SKIPPED"] as const;
export type OnboardingOutcome = (typeof ONBOARDING_OUTCOMES)[number];
export const ONBOARDING_ENTRIES = ["INVITE", "EXISTING"] as const;
export type OnboardingEntry = (typeof ONBOARDING_ENTRIES)[number];

/**
 * §9.3: the alert set-up wizard runs once. A row exists only once it has ended
 * (finished or skipped); no row means it is still due, for existing users too.
 */
export interface CtlOnboardingDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  status: OnboardingOutcome;
  at: Date;
  entry: OnboardingEntry;
}

const ctlOnboardingSchema = new Schema<CtlOnboardingDoc>({
  userId: { type: Schema.Types.ObjectId, ref: "NewUser", required: true },
  status: { type: String, enum: [...ONBOARDING_OUTCOMES], required: true },
  at: { type: Date, required: true },
  entry: { type: String, enum: [...ONBOARDING_ENTRIES], required: true },
});

ctlOnboardingSchema.index({ userId: 1 }, { unique: true });

const CtlOnboardingModel: Model<CtlOnboardingDoc> =
  mongoose.model<CtlOnboardingDoc>(
    "CtlOnboarding",
    ctlOnboardingSchema,
    "ctlOnboarding",
  );

export default CtlOnboardingModel;
