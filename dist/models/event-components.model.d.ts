import { Model } from "mongoose";
import { Types } from "mongoose";
interface IEventComponent extends Document {
    _id: Types.ObjectId;
    eventsTemplateId: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipmentIds: Types.ObjectId[];
    triggerId: Types.ObjectId;
    userGroupId: Types.ObjectId;
    assetId: Types.ObjectId;
    workspaceId?: Types.ObjectId;
    isDeleted: boolean;
}
declare const EventComponentModel: Model<IEventComponent>;
export { EventComponentModel, IEventComponent };
//# sourceMappingURL=event-components.model.d.ts.map