import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IObsoleteTask extends Document {
    taskTemplateId: Types.ObjectId;
    triggerIds: Types.ObjectId[];
    conditionType: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const ObsoleteTaskModel: Model<IObsoleteTask>;
export { ObsoleteTaskModel, IObsoleteTask };
//# sourceMappingURL=obsolete.model.d.ts.map