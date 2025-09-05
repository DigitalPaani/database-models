import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IEventTags extends Document {
    startTag: {
        sensorTag: string;
        sensorId: Types.ObjectId;
    };
    endTag: {
        sensorTag: string;
        sensorId: Types.ObjectId;
    };
    eventTag: {
        sensorTag: string;
        sensorId: Types.ObjectId;
    };
}
interface IEventsTemplate extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipmentTypes: string[];
    eventTemplateTags: IEventTags;
    isEventComponentExists: boolean;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    isArchived: boolean;
}
declare const EventsTemplateModel: Model<IEventsTemplate>;
export { EventsTemplateModel, IEventsTemplate };
//# sourceMappingURL=events-template.model.d.ts.map