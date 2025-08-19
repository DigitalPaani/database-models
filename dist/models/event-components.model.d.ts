import { Model } from "mongoose";
import { Types } from "mongoose";
interface IEventComponent extends Document {
    _id: Types.ObjectId;
    eventsTemplateId: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipments: Types.ObjectId[];
    relatedSensors: Types.ObjectId[];
    triggerId: Types.ObjectId;
    assetId?: Types.ObjectId;
    userGroupId?: Types.ObjectId;
    isDeleted: boolean;
}
declare const EventComponentModel: Model<IEventComponent>;
export { EventComponentModel, IEventComponent };
//# sourceMappingURL=event-components.model.d.ts.map