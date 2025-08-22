import { Model } from "mongoose";
import { Types } from "mongoose";
import { IEventTags } from "./events-template.model";
interface IEventComponent extends Document {
    _id: Types.ObjectId;
    eventsTemplateId: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipments: Types.ObjectId[];
    relatedSensors: Types.ObjectId[];
    eventTags?: IEventTags;
    triggerId: Types.ObjectId;
    assetId?: Types.ObjectId;
    userGroupId?: Types.ObjectId;
    workspaceId?: Types.ObjectId;
    isDeleted: boolean;
}
declare const EventComponentModel: Model<IEventComponent>;
export { EventComponentModel, IEventComponent };
//# sourceMappingURL=event-components.model.d.ts.map