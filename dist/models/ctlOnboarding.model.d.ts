import type { Model, Types } from "mongoose";
export declare const ONBOARDING_OUTCOMES: readonly ["COMPLETED", "SKIPPED"];
export type OnboardingOutcome = (typeof ONBOARDING_OUTCOMES)[number];
export declare const ONBOARDING_ENTRIES: readonly ["INVITE", "EXISTING"];
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
declare const CtlOnboardingModel: Model<CtlOnboardingDoc>;
export default CtlOnboardingModel;
//# sourceMappingURL=ctlOnboarding.model.d.ts.map