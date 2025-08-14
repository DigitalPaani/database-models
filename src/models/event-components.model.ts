import mongoose, { Model, Schema, model } from "mongoose";
import { Types } from "mongoose";

interface IDynamicValue extends Document {
  type: string;
  key: string;
  value: string;
};


interface IEventComponent extends Document {
    _id: Types.ObjectId;
    eventsTemplateId: Types.ObjectId;
    name: string;
    description: string;
    relatedEquipmentIds: Types.ObjectId[];
    triggerId: Types.ObjectId;
    assetId: Types.ObjectId;
    isDeleted: boolean;
};

const eventComponentSchema = new Schema<IEventComponent>(
  {
    eventsTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "events-templates",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    relatedEquipmentIds: {
      type: [Schema.Types.ObjectId],
      ref: "LayoutEquipments",
      required: true,
    },
    triggerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const EventComponentModel: Model<IEventComponent> = mongoose.model<IEventComponent>(
    "event-components",
    eventComponentSchema,
    "event-components"
);


export { EventComponentModel, IEventComponent };