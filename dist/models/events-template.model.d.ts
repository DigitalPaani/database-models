import type { Document, Model } from "mongoose";
import { Types } from "mongoose";
interface IEventsTemplate extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipmentTypes: string[];
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    isArchived: boolean;
}
declare const EventsTemplateModel: Model<IEventsTemplate>;
export { EventsTemplateModel, IEventsTemplate };
//# sourceMappingURL=events-template.model.d.ts.map