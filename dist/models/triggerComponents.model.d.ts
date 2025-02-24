import type { Document, Model } from "mongoose";
interface ITriggerComponent extends Document {
    type: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TriggerComponentModel: Model<ITriggerComponent>;
export { TriggerComponentModel, ITriggerComponent };
//# sourceMappingURL=triggerComponents.model.d.ts.map