import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
export interface IEventTags extends Document {
    startTag: string;
    endTag: string;
    eventTag: string;
}
interface IEventsTemplate extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipmentTypes: string[];
    eventTemplateTags: IEventTags;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    isArchived: boolean;
}
declare const EventsTemplateModel: Model<IEventsTemplate>;
export { EventsTemplateModel, IEventsTemplate };
//# sourceMappingURL=events-template.model.d.ts.map