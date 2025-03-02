import type { Document, Model, Types } from "mongoose";
interface ITriggerComponent extends Document {
    triggerId: Types.ObjectId;
    componentName: string;
    externalType: string;
    externalId: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TriggerComponentModel: Model<ITriggerComponent>;
export { TriggerComponentModel, ITriggerComponent };
//# sourceMappingURL=triggerComponents.model.d.ts.map