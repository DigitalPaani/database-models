import type { Document, Model } from "mongoose";
import mongoose, { Schema, Types } from "mongoose";
import { EQUIPMENT_TYPES } from "../constants/insights.constants";

const equipmentTypes = EQUIPMENT_TYPES.map((type) => type.value);
interface IEventTags extends Document{
    startTag: string,
    endTag: string,
    eventTag: string,
}
interface IEventsTemplate extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  relatedEquipmentTypes: string[];
  eventTags: IEventTags
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isArchived: boolean;
}

const eventsTemplateSchema = new Schema<IEventsTemplate>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    relatedEquipmentTypes: {
      type: [String],
      enum: equipmentTypes,
    },
    eventTags: {
        startTag: String,
        endTag: String,
        eventTag: String
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const EventsTemplateModel: Model<IEventsTemplate> =
  mongoose.model<IEventsTemplate>(
    "events-templates",
    eventsTemplateSchema,
    "events-templates"
  );

export { EventsTemplateModel, IEventsTemplate };
