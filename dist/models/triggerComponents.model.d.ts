import type { Document, Model, Types } from "mongoose";
interface ITriggerComponent extends Document {
    componentName: string;
    type: string;
    triggerId: Types.ObjectId;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const TriggerComponentModel: Model<ITriggerComponent>;
export { TriggerComponentModel, ITriggerComponent };
//# sourceMappingURL=triggerComponents.model.d.ts.map